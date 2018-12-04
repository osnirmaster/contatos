module.exports = function(app) {

    app.post('/contatos/alterar/:id', function(req, res) {

        var db = new app.repositories.Altera_repo();

        db.alterar(req.params.id, req.body, function(err, resp, raw) {

            if (err) {
                res.status(400).send(err);
            } else {

                res.status(201).send(resp);
            }

        });

    });
};