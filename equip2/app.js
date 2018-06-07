var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var access = require('./routes/access');
var supply = require('./routes/supply');
var contract = require('./routes/contract');
var login = require('./routes/login');
var match = require('./routes/match');
var sup = require('./routes/sup');
var save = require('./routes/save');
var view = require('./routes/view');
var assets = require('./routes/assets');
var orders = require('./routes/orders');
var company = require('./routes/company');
var ajax = require('./routes/ajax');
var client = require('./routes/client');
var ajax2 = require('./routes/ajax2');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/view', view);
app.use('/client', client);
app.use('/company', company);
app.use('/ajax', ajax);
app.use('/ajax2', ajax2);
app.use('/assets', assets);
app.use('/contract', contract);
app.use('/access', access);
app.use('/supply', supply);
app.use('/sup', sup);
app.use('/save', save);
app.use('/login', login);
app.use('/match', match);
app.use('/orders', orders);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
