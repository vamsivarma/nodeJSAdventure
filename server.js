/*
//Building a Http module
var http = require('http');
http.createServer(function(req, res) {
	//Normal request i.e.., No errors
	res.writeHead(200, {'Content-type':'text/plain'}); //Specifying content type
	res.end('Hello!');
}).listen(1337, '127.0.0.1'); //Port number and localhost address

console.log('Web server has started');
*/

//Building a Http module
var http = require('http');
var  fs =  require('fs');

http.createServer(function(req, res) {

	fs.readFile('index.html', function(err, data) {
		//Normal request i.e.., No errors
		res.writeHead(200, {'Content-type':'text/html'}); //Specifying content type
		res.end(data);	
	});

	
}).listen(1337, '127.0.0.1'); //Port number and localhost address

console.log('Web server has started');