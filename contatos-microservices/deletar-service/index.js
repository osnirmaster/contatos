var app = require('./config/custom-express')();

app.listen(3004, () => {
    console.log('Deletar service rodando na porta 3004!');
});