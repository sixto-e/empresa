var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('express-flash');

const {verifyUser, verifyAdmin, verifyLogin} = require('././middlewares/auth');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var empleadosRouter = require('./routes/admin/empleados');
const loginRouter = require('./routes/login');
const registroRouter = require('./routes/registro');
const mensajesRouter = require('./routes/mensajesForEmploys');
const perfilRouter = require('./routes/perfil');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: null }
}))
app.use(flash());

// variables globales
app.use((req, res, next) =>{
  
  app.locals.messages = req.flash('info');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/empleados', verifyAdmin, empleadosRouter);
app.use('/login',verifyLogin, loginRouter);
app.use('/registro',verifyLogin, registroRouter);
app.use('/mensajes', verifyUser, mensajesRouter);
app.use('/perfil',verifyUser, perfilRouter);

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

module.exports = app;
