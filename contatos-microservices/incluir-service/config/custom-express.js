var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
const config = require('../config/config');
const mongoose = require('mongoose');


module.exports = function(){
  var app = express();

  mongoose.connect(config.connectionString, { useNewUrlParser: true });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

  consign()
   .include('controllers')
   .into(app);

  return app;
}