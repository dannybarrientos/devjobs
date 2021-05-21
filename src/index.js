const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path');
const router = require('../src/routes')

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

app.use('/', router());

app.listen(5000)