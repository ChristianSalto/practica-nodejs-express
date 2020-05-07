var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'public/img/') });



var app = express();

// conectar a la base de datos
const mongooseConnection = require('./lib/connectMongoose');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

const type = upload.single('foto');
const jwtAuth = require('./middleware/jwtAuth');
/**
 * Rutas del API
 */


app.use('/apiv1/adsnodepops', type, require('./routes/api/adsNodepops'));
app.use('/apiv1/authentication', require('./routes/api/authenticationJWT'));


/**
 * Inicializamos el sistema de sesiones
 * con el middelware que me deja la sesion del usuario cargada en req.session
 */

app.use(session({
  name: 'nodepop-session',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 2
  },

  store: new MongoStore({
    mongooseConnection: mongooseConnection
  }),
}));


/**
 * Rutas del webside
 */

const sessionAuth = require('./middleware/sessionAuth');
const logout = require('./middleware/logout');

// session available for the entire app
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', require('./routes/index'));
app.use('/listTags', require('./routes/listTags'));
app.use('/cards', require('./routes/cards'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/login', require('./routes/login'));
app.use('/private', sessionAuth, require('./routes/private'));
app.use('/logout', logout, require('./routes/cards'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  res.status(err.status || 500);

  // we can handle the error and give more 
  // details if the error comes from the URL /api/

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  };

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/apiv1/');
}

module.exports = app;
