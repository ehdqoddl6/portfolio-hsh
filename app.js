var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

var logger = require('morgan');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log(__dirname);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//auto-increment를 위한 패키지
var autoIncrement = require('mongoose-auto-increment');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    console.log("mongo db Connection");
});

var database;

var databaseUrl = 'mongodb+srv://ehdqoddl6:0000@study.cbjjc.mongodb.net/project?retryWrites=true&w=majority';
	 
// connect the mongo database
console.log('try database connection');
mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
connect = mongoose.connect(databaseUrl);
database = mongoose.connection;



var admin = require('./routes/admin');

app.get('/', function(req, res){
   res.render('index');
});

app.use('/admin', admin);

app.listen(port, function(){
    console.log('Express listening on port', port);
})