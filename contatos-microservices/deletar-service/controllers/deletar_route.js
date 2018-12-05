module.exports = function(app) {

    app.post('/contatos/excluir/:id', (req, res) => {

        var id = req.params.id;

        var db = new app.repositories.Deletar_repo();

        db.deletar(id, function(err, resp) {

            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(resp);
            }

        });

    });
}