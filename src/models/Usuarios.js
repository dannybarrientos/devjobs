const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt')

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    expira: Date,
    imagen: String
});

//TODO Metodo para hashear los password
usuariosSchema.pre('save', async function(next) {
    //TODO Si el password ya esta hasheado
    if(!this.isModified('password')) {
        return next() //TODO Deten la ejecucion
    }
    //TODO Si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password= hash
    next();
})
//TODO Validar si el correo ya esta registrado
usuariosSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoError' && error.code === 11000 ){
        next('Ese correo ya esta registrado');
    } else {
        next(error);
    }
});


module.exports = mongoose.model('Usuarios', usuariosSchema)