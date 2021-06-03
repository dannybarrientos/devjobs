const passport = require('../config/passport');
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');
const Usuario = mongoose.model('Usuarios');
const crypto = require('crypto');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracion',
    failureRedirect : '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage : 'Ambos campos son obligatorio'
})

//TODO Revisar si el usuario esta autenticado ono
exports.verificarUsuario = (req, res, next) => {

    //TODO Revisar el usuario
    if(req.isAuthenticated()){
        return next()//TODO Estan autenticado
    }

    //TODO Redireccionar
    res.redirect('/iniciar-sesion')

}


exports.mostrarPanel = async(req, res) => {

    //TODO Consultar el usuario autenticado
    const vacantes = await Vacante.find({autor: req.user._id});



    res.render('administracion', {
        nombrePagina: 'Panel de Adminitracion',
        tagline: 'Crear y Administra tus vacantes desde aquí ',
        cerrarSesion: true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        vacantes
    })
}

exports.cerrarSesion = (req, res) => {
    req.logout();
    req.flash('correcto', 'Cerraste sesion Correctamente')

    return res.redirect('iniciar-sesion')
}

//TODO Formulario para restablecer-password','
exports.formRestablecerPassword =  (req, res) => {
    res.render('restablecer-password', {
        nombrePagina : 'Restablecer tu password',
        tagline: 'Si ya tienes una cuenta pero olvidaste tu password coloca tu emmail'
    });
}

//TODO Genera el token en la tabla del usuario
exports.enviarToken = async (req, res) => {


    const usuario = await Usuario.findOne({ email: req.body.email });
    if(!usuario) {
        req.flash('error','El usuario no existe');
        return res.redirect('/iniciar-sesion');
    }

    //TODO El usuario existe, genera un token

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expira = Date.now() + 3600000;

    //TODO Guarda el usuario
    await usuario.save();
    const resetUrl = `http://${req.headers.host}/restablecer-password/${usuario.token}`;

    //TODO Enviar notificacion por el email
    await enviarEmail.enviar({
        usuario,
        subject : 'Password Reset',
        resetUrl,
        archivo: 'reset'
    });

    //TODO Todo correcto
    req.flash('correcto', 'Revisa tu email para las indicaciones');
    res.redirect('/iniciar-sesion');
}

//TODO valida si el token es valido  y el usuario existe, muestra la vista
exports.restablecerPassword = async (req, res) => {

    const usuario = await Usuario.findOne({
        token: req.params.token,
        expira: {
            $gt: Date.now()
        }
    });

    if(!usuario) {
        req.flash('error','El formulario ya no es valido, intenta de nuevo');
        return res.redirect('/restablecer-password');
    }

    //TODO MOstrar el formulario de nuevo password
    res.render('nuevo-password',{
        nombrePagina : 'Nuevo Password',

    })
}

exports.guardarPassword = async (req, res) => {
    const usuario = await Usuario.findOne({
        token: req.params.token,
        expira: {
            $gt: Date.now()
        }
    });

    //TODO No existe el usuario o el token es invalido
    if(!usuario) {
        req.flash('error','El formulario ya no es valido, intenta de nuevo');
        return res.redirect('/restablecer-password');
    }
    //TODO Guardar en la base de datos
    //TODO Asignar nuevo password, limpiar valores previos
    usuario.password = req.body.password;
    usuario.token = undefined;
    usuario.expira = undefined;

    //TODO Agregar y eliminar valores del objetos
    await usuario.save();

    //TODO Redirigir
    req.flash('correcto', 'Password Modificado Correctamente');
    res.redirect('/iniciar-sesion');
}