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
mongoose.Promise = global.Promise;  
connect = mongoose.connect(databaseUrl);
database = mongoose.connection;



var project = require('./routes/project');

app.get('/', function(req, res){
   res.render('index');
});

app.post('/', function(req, res){
    var name = req.body.project_name;
    console.log(name);
    res.redirect('/project?id='+name);
 });


app.use('/project', project);

app.listen(port, function(){
    console.log('Express listening on port', port);
})