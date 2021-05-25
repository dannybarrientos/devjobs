const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    }).then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
    });

mongoose.connection.on('error', (error) => {
    console.log(error);
})
//TODO mportar los modelos
require('../models/Usuarios');
require('../models/Vacantes');