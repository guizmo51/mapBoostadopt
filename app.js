var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession);
var app = express();


mongoose.connect('mongodb://localhost/adopt');
app.use(cookieParser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("jsonp callback", true);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressSession({  secret: 'secret',
     store: new MongoStore( {db :'adopt'})}
   
));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/javascripts",express.static(path.join(__dirname, 'javascripts')));
app.use("/img",express.static(path.join(__dirname, 'img')));
app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});






/// error handlers

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
