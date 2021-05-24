const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');
const shortid = require('shortid');
//TODO De esta forma tambien se puede hacer const Vacante = require('../models/vacantes')

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    })
}
//TODO Agregar las vacantes a la bases de datos
exports.agregarVacante = async (req, res) => {

    const vacante = new Vacante(req.body);

    //TODO Crear arreglos de habilidades (skills)
    vacante.skills = req.body.skills.split(',')

    //TODO Almacenar en la bases de datos
    const nuevaVacante = await vacante.save()

    //TODO Redireccionar hacia la nueva vacante y poderla ver
    res.redirect(`/vacantes/${nuevaVacante.url}`);



}