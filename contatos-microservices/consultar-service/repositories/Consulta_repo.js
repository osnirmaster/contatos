var Contatos = require('../models/Cadastro');
var logger = require('../services/logger');

function ContatosCreateDB() {  

}

ContatosCreateDB.prototype.consultar = function (callback) {

    var tempoAntes = Date.now();

    Contatos.find({}, callback);

    var tempoDepois = Date.now() - tempoAntes;
    logger.info('Tempo de execução: ' + tempoDepois +"ms");
  }

module.exports = function () {
    return ContatosCreateDB;
  }