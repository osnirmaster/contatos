var Contatos = require('../models/Cadastro');
var logger = require('../services/logger');

function ContatosCreateDb() {

};

ContatosCreateDb.prototype.deletar = function(id, callback) {

    var tempoAntes = Date.now();
    Contatos.deleteOne({ _id: id }, callback);

    var tempoDepois = Date.now() - tempoAntes;

    logger.info('Tempo de execução: ' + tempoDepois + "ms");

};

module.exports = function() {

    return ContatosCreateDb;
};