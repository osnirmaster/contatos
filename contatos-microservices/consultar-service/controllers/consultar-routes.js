var Cadastro = require('../models/Cadastro');

module.exports = function (app) {

    app.get('/contatos/consultar', function (req, res){

        var doc = req.query

        var consulta = new app.repositories.Consulta_repo();

        consulta.consultar(function (err,response) {

            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send(response);
            }
          });
      })
  }