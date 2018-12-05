var express = require('express');
var logger = require('morgan');
var http = require('http');
var httpProxy = require('express-http-proxy');
var helmet = require('helmet');

var app = express();

const alterarServiceProxy = httpProxy('http://localhost:3003');
const consultarServiceProxy = httpProxy('http://localhost:3002');
const incluirServiceProxy = httpProxy('http://localhost:3001');
const deletarServiceProxy = httpProxy('http://localhost:3004');

// Rotas Proxy

//alterar microservice
app.post('/contatos/alterar/:id', function(req, res, next) {

    alterarServiceProxy(req, res, next);

});

//consultar microservice
app.get('/contatos/consultar', (req, res, next) => {

    consultarServiceProxy(req, res, next);

});

//incluir microservice
app.post('/contatos/incluir', (req, res, next) => {

    incluirServiceProxy(req, res, next);

});

//deletar microservice
app.post('/contatos/excluir/:id', (req, res, next) => {

    deletarServiceProxy(req, res, next);

});

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

var server = http.createServer(app);

server.listen(3000, () => {
    console.log('Gateway iniciado via porta 3000');
});