var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var expressJWT = require('express-jwt');        // Middleware that validates JWTs and sets req.user
var jwt = require('jsonwebtoken');              // Signs JWTs (i.e. creates the JWTs that express-jwt validates)

var tokenHelper = require('./lib/utilities/tokenHelper');

// start scripts
require('./lib/scripts/register');

// Routes
var api = require('./routes/api/index');

var app = express();

// API tokens
var pathsNotRequiringToken = [
    '/api',
    '/api/users/test',
    '/api/tests/mclogin',
    '/api/tests/mcsessid'];
app.use(expressJWT({
    secret: "qHRzkGjXR5ZWZYrhOhGA"
}).unless({ path: pathsNotRequiringToken }));

// Express request pipeline
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));

// API routes
app.use('/api', api);

// Connect to mongo
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    console.log("Connected to mongo from app.js!");
});

// This function is called when top-level errors are thrown
app.use(function(err, req, res, next) {
    console.log("TOP LEVEL ERROR:");
    console.log(err);
    console.log(req.url);
    console.log(req.originalUrl);
    console.log(req.path);
    if (err.name === 'UnauthorizedError') {
        tokenHelper.tokenError(err, req, res);
    } else {
        console.log(err.name);
        res.status(401).json({status: 401, message: "Unidentified error: " + err.name});
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
