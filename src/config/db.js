const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true, useCreateIndex: true
    });

mongoose.connection.on('error', (error) => {
    console.log(error);
})
//TODO Importar los modelos
require('../models/Usuarios');
require('../models/Vacantes');