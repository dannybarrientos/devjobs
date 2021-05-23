const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');

const vacantesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        requerid: 'El nombre de la vancate es obligatorio',
        trim: true
    },
    empresa :{
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required : 'La ubicacion es obligatoria'
    },
    salario: {
        type: String,
        default:0,
        trim: true
    },
    contrato:{
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: [String],
    candidatos:[{
        nombre: String,
        email: String,
        cv: String
    }]
});

//TODO Middleware para validar datos antes
vacantesSchema.pre('save', function(next) {

    //TODO Crear la URL con su unico id
    const url = slug(this.titulo);
    this.url =`${url}-${shortid.generate()}`;

    next();
})
module.exports = mongoose.model('Vacante', vacantesSchema)