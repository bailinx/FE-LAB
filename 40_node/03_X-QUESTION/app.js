var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./app/config/config');
var routes = require('./app/routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /app
//app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.cookieSecret));
app.use(require('less-middleware')(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'public')));
//app.disable('x-powered-by');

routes(app);

module.exports = app;
