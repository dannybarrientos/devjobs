const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const multer = require('multer');
const shortid =require('shortid');

exports.subirImagen = (req, res, next) => {
    upload(req, res,function(error) {
        if(error instanceof multer.MultiError){
            return next();

        }
    });
    next();
}
//TODO Opciones de MultiError
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../public/uploads/perfiles');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    })
}

const upload = multer(configuracionMulter).single('imagen')




exports.formCrearCuenta = (req, res ) => {
    res.render('crear-cuenta',{
        nombrePagina: 'Crear tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}
//TODO Validar registros
exports.validarRegistro = (req, res, next) => {

    //TODO sanitizar
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    //TODO validar
    req.checkBody('nombre', 'El Nombre es Obligatorio').notEmpty();
    req.checkBody('email', 'El email debe ser valido').isEmail();
    req.checkBody('password', 'El password no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'Confirmar password no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    const errores = req.validationErrors();

    if(errores){
        //TODO si hay errores
        req.flash('error', errores.map(error => error.msg));

        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        });
        return;
    }

    //TODO Si toda la validación es correcta
    next();
}

exports.crearUsuario = async (req, res, next) => {
    //TODO Crear el usuario
    const usuario = new Usuarios(req.body);
    try {
        await usuario.save();
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error);
        res.redirect('/crear-cuenta');
    }
}

//TODO Formulario iniciar sesion
exports.formIniciarSesion = (req, res ) => {
    res.render('iniciar-sesion', {
        nombrePagina : 'Iniciar Sesión devJobs'
    })
}

//TODO Formulario Editar Perfil
exports.formEditarPerfil = (req, res) => {
    res.render('editar-perfil', {
        nombrePagina : 'Edita tu perfil en devJobs',
        usuario: req.user,
        cerrarSesion: true,
        nombre: req.user.nombre,
    })
}

//TODO Guardar cambios editar perfil
exports.editarPerfil = async (req, res) => {
    const usuario = await Usuarios.findById(req.user._id);

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    if(req.body.password) {
        usuario.password = req.body.password
    }
    await usuario.save();

    req.flash('correcto', 'Cambios Guardados Correctamente');
    // redirect
    res.redirect('/administracion');
}

//TODO Sanitizar  y validar el formulario de editar el perfiles
exports.validarPerfil = (req, res, next) => {

    //TODO sanitizar
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();

    if(req.body.password){
        req.sanitizeBody('password').escape();
    }

    //TODO validar
    req.checkBody('nombre', 'El Nombre no puede ir vacio').notEmpty();
    req.checkBody('email', 'El correo no puede ir vacio').isEmail();

    const errores = req.validationErrors();

    if(errores){
        //TODO si hay errores
        req.flash('error', errores.map(error => error.msg));
        res.render('editar-perfil', {
            nombrePagina : 'Edita tu perfil en devJobs',
            usuario: req.user,
            cerrarSesion: true,
            nombre: req.user.nombre,
            mensajes: req.flash()
        })

    }

    //TODO Si toda la validación es correcta
    next();
}