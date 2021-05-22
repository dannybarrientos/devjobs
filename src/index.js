const mongoose = require('mongoose');
require('./config/db')

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path');
const router = require('../src/routes')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config({path :'variables.env'})

const app = express();

//TODO Habilitamos Handlebars como View
app.engine('handlebars',
    exphbs({
        defaultLayout: 'layout',
    })
);
app.set('view engine', 'handlebars');

//TODO Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())
//TODO Realizo el firmado de mi session
app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use('/', router());

app.listen(process.env.PUERTO)