var app = require('./config/custom-express')();

app.listen(3003, function() {
    console.log('Alterar Service executando na porta : 3003');
})