var Contatos = require('../models/Cadastro.js');
var logger = require('../services/logger.js');

function ContatoCreateDB () {  

};

ContatoCreateDB.prototype.salva = function (data,callback) {  
    var tempoAntes = Date.now();
    var client = new Contatos(data);
    client.save(callback);

    //logando o tempo de execução
    var tempoDepois = Date.now() - tempoAntes;
    logger.info('Tempo de execução: ' + tempoDepois +"ms");

};


module.exports = function () {
    return ContatoCreateDB;
  }
