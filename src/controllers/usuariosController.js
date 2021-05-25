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
    req.checkBody('nombre', 'El Nombre es Obligatorio').noEmpty();

    const errores = req.validationErrors();

    console.log(errores);

    return;
}

exports.crearUsuario = async(req, res, next) => {
  //TODO Crear el usuario
    const usuario = new Usuarios(req.body)

    const nuevoUsuario = await usuario.save();

    if(!nuevoUsuario) return next()

    res.redirect('/iniciar-sesion')
}