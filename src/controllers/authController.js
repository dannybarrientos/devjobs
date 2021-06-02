const passport = require('../config/passport');
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

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