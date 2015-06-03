var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// app setup
mongoose.connect("mongodb://localhost:27017/BilltasticJS");

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var customer = require('./routes/customer');
var tax = require('./routes/tax');
var product = require('./routes/product');
var order = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'gatico', resave: true, saveUninitialized: false, cookie: { maxAge : 3600000 } }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//passport config
var Seller = require('./models/Seller');
passport.use(new LocalStrategy(Seller.authenticate()));
passport.serializeUser(function(user, done){
    done(null, user._id)
});
passport.deserializeUser(function(id, done) {
    Seller.findById(id, function(err, user) {
    done(err, user);
    });
});

/* ROUTES */
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);

//api routes
app.use('/api/customer', customer);
app.use('/api/tax', tax);
app.use('/api/product', product);
app.use('/api/order', order);



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
