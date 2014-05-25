//Module Dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var db = monk('localhost:27017/nodeJSAdventure'); //Its equal to the database 


//Set port number
var portnumber = 3000;

//Initialize express
var app = express();
console.log('Express has been initialized');

function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

//Set Views Folder
app.set('views', __dirname + '/views');

//Initialize Jade
app.set('view engine', 'jade');
console.log('Jade has been initialized');

//Stylus Middleware
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('mykey'));
app.use(session());
//app.use(app.router());

//Stylus Middleware
//For handling incoming requests
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
))

app.use(express.static(__dirname + '/public'));

console.log('Stylus has been initialized successfully');

//Render Index Page
//Specifying the list of routes in our application
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/userlist',routes.userlist(db));
app.post('/adduser',routes.adduser(db));


app.listen(portnumber);

console.log('Server is now running on port ' + portnumber);