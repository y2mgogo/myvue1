var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//라우터 예시 테스트
var moviesRouter = require('./routes/movies');

var mysql = require('mysql');

var app = express();

// Connection 객체 생성 
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'test2',   
  password: '0000',
  database: 'propile_db'  
});  
// Connect
connection.connect(function (err) {   
  if (err) {     
    console.error('mysql connection error');     
    console.error(err);     
    throw err;   
  } 
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// insert
app.post('/regist', function (req, res) {
  console.log('req.body, ',req.body);
  var profile = {
    'data_type': req.body.dataType,
    'content': req.body.career
  };
  var query = connection.query('insert into profile set ?', profile, function (err, result) {
    if (err) {
      console.error(err);
      throw err;
    }
    res.status(200).send('success');
  });
});

// modify
app.post('/modify', function (req, res) {
  console.log('req.body, ',req.body);
  const content = req.body.career;
  const id = req.body.id;
  var query = connection.query('UPDATE profile SET content = ? WHERE id = ?', [content,id], function (err, result) {
    if (err) {
      console.error(err);
      throw err;
    }
    res.status(200).send('success');
  });
});

// delete
app.post('/delete', function (req, res) {
  console.log('req.body, ',req.body);
  //const content = req.body.career;
  const id = req.body.id;
  var query = connection.query('DELETE FROM profile WHERE id = ?', id, function (err, result) {
    if (err) {
      console.error(err);
      throw err;
    }
    res.status(200).send('success');
  });
});

// select
app.post('/select', function (req, res) {
  console.log('req.body, ',req.body);
  var dataType = req.body.dataType;
  var query = connection.query('select * from profile where data_type = ? order by id desc', [dataType], function (err, result) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
  //console.log('query, ',query);
});

app.use(express.urlencoded({extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 라우터 예시 테스트
app.use('/api/movies', moviesRouter);

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

// insert
app.post('/regist', function (req, res) {
  //console.log('aaa: '+ req.body.userid);
  var user = {
    'userid': req.body.userid,
    'name': req.body.name,
    'address': req.body.address
  };
  var query = connection.query('insert into users set ?', user, function (err, result) {
    if (err) {
      console.error(err);
      throw err;
    }
    res.status(200).send('success');
  });
});

module.exports = app;
