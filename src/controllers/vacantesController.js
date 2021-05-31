const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');
//TODO De esta forma tambien se puede hacer const Vacante = require('../models/vacantes')

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante',
        cerrarSesion: true,
        nombre: req.user.nombre,
    })
}
//TODO Agrega las vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
    const vacante = new Vacante(req.body);

    //TODO Usuario autor de la vacantes
    vacante.autor = req.user._id;

   //TODO Crear arreglo de habilidades (skills)
    vacante.skills = req.body.skills.split(',');

    //TODO Almacenarlo en la base de datos
    const nuevaVacante = await vacante.save()

    //TODO Redireccionar hacia la nueva vacante y poderla ver
    res.redirect(`/vacantes/${nuevaVacante.url}`);

}
exports.mostrarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url });
    //TODO Si no hay resultados
    if(!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina : vacante.titulo,
        barra: true
    })
}
exports.formEditarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url });

    //TODO Si no hay resultados
    if(!vacante) return next();

    res.render('editar-vacante', {
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`,
        cerrarSesion: true,
        nombre: req.user.nombre,
    })
}

exports.editarVacante = async (req, res) => {
     const vacanteActualizada = req.body

     vacanteActualizada.skills = req.body.skills.split(',')

     const vacante = await Vacante.findOneAndUpdate({url: req.params.url},
         vacanteActualizada, {
             new: true,
             runValidators: true
         })
         res.redirect(`/vacantes/${vacante.url}`);
}

//TODO Validar y sanitizar los campos de las nuevas vacantes
exports.validarVacante = (req, res, next) => {
    //TODO Sanitizar los campos
    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    //TODO Validar
    req.checkBody('titulo', 'Agrega un Titulo a la Vacante').notEmpty();
    req.checkBody('empresa', 'Agrega una Empresa').notEmpty();
    req.checkBody('ubicacion', 'Agrega una Ubicación').notEmpty();
    req.checkBody('contrato', 'Selecciona el Tipo de Contrato').notEmpty();
    req.checkBody('skills', 'Agrega al menos una habilidad').notEmpty();

    const errores = req.validationErrors();

    if(errores) {

        //TODO Recarga la vista con los errores
        req.flash('error', errores.map(error => error.msg));

        res.render('nueva-vacante', {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el formulario y publica tu vacante',
            cerrarSesion: true,
            nombre: req.user.nombre,
            mensajes: req.flash()
        })
    }

    next();//TODO Siguiente Middleware

}
//TODO Eliminar vacante
exports.eliminarVacante = async(req, res) => {

    const { id } = req.params;

    const vacante = await Vacante.findById(id);
    console.log(vacante);
    if(verificarAutor(vacante, req.user)) {
        //TODO Todo Bien , si  es el usuario a eliminar
        res.status(200).send('Vacante ELiminada CORRectamente');
    } else {
        //TODO no es permitido el usuario
        res.status(403).send('Error');
    }

}

const verificarAutor = (vacante = {}, usuario = {}) => {
        if(!vacante.autor.equals(usuario._id)) {
            return false;
        }
        return true;
}