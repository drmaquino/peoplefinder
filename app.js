var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apis = require('./routes/apis');
var pages = require('./routes/pages');
var mongodb = require("./mongodb")

var app = express();

/* Run Mode */
if (app.get('env') ==='development') {
    console.log("running in dev mode!");
} else if (app.get('env') ==='production') {
    console.log("running in prod mode!");
}

/* Logger */
if (app.get('env') ==='development') {
    // app.use(logger('dev'));
}

/* Database */
if (app.get('env') ==='development') {
    app.set('mongodb_uri', 'mongo://localhost/peoplefinder-dev');
} else if (app.get('env') ==='production') {
    app.set('mongodb_uri', 'mongo://localhost/peoplefinder-prod');
}

app.use(mongodb);

/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routers */
app.use('/', pages);
app.use('/api', bodyParser.json(), apis);

/* Error Handler */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (app.get('env') === 'development') {
        // prints stacktrace for debugging
        res.render('error', {
            message: err.message,
            error: err
        });
    } else if (app.get('env') === 'production') {
        // no stacktraces leaked to user
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

module.exports = app;
