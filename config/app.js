console.log('Resolved Path to DB:', require.resolve('./db'));

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Database connection
const DB = require('./db'); // Corrected path
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB');
});

const indexRouter = require('../routes/index'); // Adjusted for relative path
const raceRouter = require('../routes/race'); // Adjusted for relative path

const app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views')); // Adjusted for relative path
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); // Adjusted for relative path

app.use('/', indexRouter);
app.use('/races', raceRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
