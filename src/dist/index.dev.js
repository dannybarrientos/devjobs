"use strict";

var express = require('express');

var router = require('./router/index');

var exphbs = require('express-handlebars');

var path = require('path');

var app = express(); //TODO Habilitamos Handlebars como View

app.engine('handlebars', exphbs({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars'); //TODO Static Files

app.use(express["static"](path.join(__dirname)));
app.use('/', router());
app.listen(5000);