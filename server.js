var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./app_api/models/db.js');

// var data = {
//   tables: {
//     people: [
//      {id: 1, name: "John", age: 32},
//      {id: 2, name: "Peter", age: 29},
//     ],
//     cars: [
//       {id: 1, brand: "Jeep", model: "Cherokee", owner: 2},
//       {id: 2, brand: "BMW", model: "X5", owner: 2},
//       {id: 3, brand: "Volkswagen", model: "Polo", owner: 1},
//     ],
//   },
// }


// db.connect(db.MODE_TEST, function() {
//   console.log('trying to connect to db...');
//   db.drop(['people', 'cars'], function(err){
//     if(err){ 
//       return console.log(err);
//     }else{
//       console.log('DB is dropped.');
//       db.fixtures(data, function(err) {
//         if (err) return console.log(err);
//         console.log('Data has been loaded...');
//       });
//     }
//   });
// });
db.connect(db.MODE_PRODUCTION, function(){
  //console.log('Connected to database: ' + db.MODE_PRODUCTION);
});

// var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist', 'langapp')));
// app.use(express.static(path.join(__dirname, 'app_client')));

// app.use('/', routes);
app.use('/api', routesApi);

app.use(function(req, res){
	res.sendFile(path.join(__dirname, 'dist', 'testingapp', 'index.html'));
});

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
