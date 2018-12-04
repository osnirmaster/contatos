var logger = require('../service/logger');
var Cadastro = require('../models/Cadastro');

function ContatoCreateDB() {

}

ContatoCreateDB.prototype.alterar = function(id, doc, callback) {

    var tempoAntes = Date.now();

    var teste = Cadastro.findOneAndUpdate(id, { $set: doc }, callback);

    var tempoDepois = Date.now() - tempoAntes;

    logger.info('Tempo de execução: ' + tempoDepois + "ms");

};

module.exports = function() {
    return ContatoCreateDB;
};