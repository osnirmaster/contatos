var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');
var mongoose = require('mongoose');
var config = require('../config/config');

module.exports = function() {

    var app = express();
    mongoose.connect(config.connectionString, { useNewUrlParser: true });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    consign()
        .include('controllers')
        .then('repositories')
        .then('services')
        .into(app)

    return app;

};