const Contatos = require('../models/Cadastro.js');

module.exports = function(app) {


    // Connecta ao banco

    app.post('/contatos/incluir', function(req, res) {


        try {

            // Insere o contato
            var item = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                empresa: req.body.empresa,
                cargo: req.body.cargo,
                email: req.body.email,
                telefone: req.body.telefone,
                observacao: req.body.observacao

            };

            item.date = new Date;


            // var data = new Contatos(item);
            // data.save()

            var contato = new app.repositories.ContatoCreateDB();

            contato.salva(item, function(err, data, num) {
                if (err) {

                    res.status(400).send({ err });
                } else {
                    res.status(201).send({
                        data
                    });
                }

            });


        } catch (e) {
            console.log(e);
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }

    });


    app.post('/contatos/buscar', function(req, res, callback) {

        var resonse = Contatos
            .find({
                first_name: req.body.first_name,
                last_name: req.body.last_name

            }, function(err, elements) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(elements);
                }
            });


    });

    app.post('/contatos/alterar/:id', function(req, res, callback) {

        var item = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            empresa: req.body.empresa,
            cargo: req.body.cargo,
            email: req.body.email,
            telefone: req.body.telefone,
            observacao: req.body.observacao
        };

        var contato = Contatos.findByIdAndUpdate(req.params.id, { $set: item }, function(err, response) {
            console.log(contato);
            res.status(200).send({ "mensagem": "alteracao efetuada com sucesso" });
        });

    });

    app.post('/contatos/excluir/:id', function(req, res) {

        var id = req.params.id;

        Contatos.deleteOne({ _id: id }, function(err, response) {

            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(response);
            }

        });


    });

    app.get('/contatos/consultar', function(req, res) {

        Contatos.find({}, function(err, response) {

            res.send(response);
        });
    })
}