const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useCreateIndex: true
    });

mongoose.connection.on('error', (error) => {
    console.log(error);
})
//TODO mportar los modelos
require('../models/Usuarios');
require('../models/Vacantes');