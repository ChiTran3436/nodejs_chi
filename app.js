var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const MyDatabase = require('./src/database/initdatabase');
const { log } = require('console');
var cors = require('cors');

MyDatabase.connection()

var app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.use('/api/v1', require('./src/routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  console.log(err.message);

  // render the error page
  res.status(err.status || 500).send({
    message: err.message
  });

});

module.exports = app;
