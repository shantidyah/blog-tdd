var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');


require('dotenv').config()
var app = express();
app.use(require('cors')())
const mongoose = require('mongoose');


let MONGO_URI = process.env.MONGO_DEV
if(process.env.NODE_ENV == 'test') {
  MONGO_URI = process.env.MONGO_TEST
}
// console.log(MONGO_URI);

mongoose.connect(MONGO_URI,{useNewUrlParser:true},function(err){
  if(err){
    console.log(err);
  }
  else{
    // console.log("connected",MONGO_URI);
    console.log('connected to', process.env.NODE_ENV);
    
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);

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
