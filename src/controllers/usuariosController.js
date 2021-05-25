const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req, res ) => {
    res.render('crear-cuenta',{
        nombrePagina: 'Crear tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}
//TODO Validar registros
exports.validarRegistro = (req, res, next) => {

    //TODO Sanitizar mis datos
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    //TODO Validar
    req.checkBody('nombre', 'El Nombre es Obligatorio').noEmpty();
    req.checkBody('email', 'El email es Obligatorio').isEmail();
    req.checkBody('password', 'El password no pueder ir vacio').noEmpty();
    req.checkBody('confirmar', 'Confirmar password no pueder ir vacio').noEmpty();

    const errores = req.validationErrors();

    if(errores){
        //TODO Si hay errores

    }
//TODO Si todo la validacion es correcta;
    next();
}

exports.crearUsuario = async(req, res, next) => {
  //TODO Crear el usuario
    const usuario = new Usuarios(req.body)

    const nuevoUsuario = await usuario.save();

    if(!nuevoUsuario) return next()

    res.redirect('/iniciar-sesion')
}