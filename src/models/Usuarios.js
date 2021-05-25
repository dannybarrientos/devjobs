const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt')

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true

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
    expira: Date

})

//TODO Metodo para hashear los password
usuarioSchema.pre('save', async function(next) {
    //TODO Si el password ya esta hasheado
    if(!this.isModified('password')) {
        return next() //TODO Deten la ejecucion
    }
    //TODO Si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password= hash
    next();
})


module.exports = mongoose.model('Usuarios', usuarioSchema)