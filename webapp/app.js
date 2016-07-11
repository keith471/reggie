var express = require('express');
var path = require('path');
var compression = require('compression');

// React Router imports
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './public/components/routes'

var app = express();

app.use(compression());

// Serve static stuff
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.get('*', function (req, res) {
    match({ routes: routes, location: req.url }, (err, redirect, props) => {
        if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message)
        } else if (redirect) {
            // we haven't talked about `onEnter` hooks on routes, but before a
            // route is entered, it can redirect. Here we handle on the server.
            res.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            // if we got props then we matched a route and can render
            const appHtml = renderToString(<RouterContext {...props}/>)
            res.send(renderPage(appHtml))
        } else {
            // no errors, no redirect, we just didn't match anything
            res.status(404).send('Not Found')
        }
    })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

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

var PORT = process.env.PORT || 4000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
