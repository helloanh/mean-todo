process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// init mongoose config 
var mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose();
var app = express();

app.listen(3000);
module.exports = app;

console.log("Server runing at http://localhost:3000/");




