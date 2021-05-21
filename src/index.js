const express = require('express')
const router = require('./router/index')
const exphbs = require('express-handlebars')
const path = require('path');

const app = express();

//TODO Habilitamos Handlebars como View
app.engine('handlebars',
    exphbs({
        defaultLayout: 'layout'
    })
);
app.set('view engine', 'handlebars');

//TODO Static Files
app.use(express.static(path.join(__dirname)));

app.use('/', router());

app.listen(5000)