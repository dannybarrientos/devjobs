require('./config/db');
require('dotenv').config({path :'variables.env'})

const mongoose = require('mongoose');
const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const router = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const createError = require('http-errors')
const flash = require('connect-flash');
const passport = require('passport')


const app = express();

//TODO Habilitar el body parser para leer los datos del formulario
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//TODO Validacion campos
app.use(expressValidator());

//TODO Habilitamos Handlebars como View
app.engine('handlebars',
    exphbs({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);
app.set('view engine', 'handlebars');

//TODO Cargar Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())

//TODO Realizo el firmado de mi session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//TODO Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());


//TODO Alertas y flash messages
app.use(flash())

//TODO Crear nuestro middleware -- lo podemos hacer en otro archivo si desean
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use('/', router());

//TODO 404 Pagina no existe
app.use((req, res, next) => {
    next(createError(404, 'No encontrado'));
})

//TODO Administracion de los errores
app.use((error, req, res) => {
    res.locals.mensaje = error.message;
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error')

})
app.listen(process.env.PUERTO)