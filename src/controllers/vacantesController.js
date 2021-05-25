const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');
//TODO De esta forma tambien se puede hacer const Vacante = require('../models/vacantes')

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    })
}
//TODO Agrega las vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
    const vacante = new Vacante(req.body);

   //TODO Crear arreglo de habilidades (skills)
    vacante.skills = req.body.skills.split(',');

    //TODO Almacenarlo en la base de datos
    const nuevaVacante = await vacante.save()

    //TODO Redireccionar hacia la nueva vacante y poderla ver
    res.redirect(`/vacantes/${nuevaVacante.url}`);

}
exports.mostrarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url }).lean();
    //TODO Si no hay resultados
    if(!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}
exports.formEditarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url }).lean();

    //TODO Si no hay resultados
    if(!vacante) return next();

    res.render('editar-vacante', {
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`
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