var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authController = require('./controllers/login');
var User = require('./models/user');
var routes = require('./routes')
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('./passport-config');
const session = require('express-session');
const axios = require('axios');
const loginRoute = require('./controllers/login');
const signUpRoute = require('./controllers/singUp');
app = express();
app.set('axios', axios);


require('./connection/dbConnection')(mongoose)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:'secret-key', resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/login',loginRoute.login);
app.use('/insert',signUpRoute.insert);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.use(session({
  secret: 'ium_tweb_final_assignment',
  resave: false,
  saveUninitialized: true,
  cookie: true,
}));

module.exports = app;
