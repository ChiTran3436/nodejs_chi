var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const MyDatabase = require('./src/database/initdatabase');
const { log } = require('console');
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const multer = require('multer');

MyDatabase.connection()

var app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.use('/api/v1', require('./src/routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {

  if (err instanceof mongoose.Error.ValidationError) {
    const e = {}
    for (const field in err.errors) {
      e[field] = err.errors[field].message
    }
    return res.status(400).json({
      status: 400,
      message: e
    })
  }

  const statusCode = err.status || 500

  res.status(statusCode).send({
    status: statusCode,
    message: err.message
  });

});

module.exports = app;
