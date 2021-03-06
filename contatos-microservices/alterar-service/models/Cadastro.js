var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    first_name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true
    },
    last_name: {
        type: String,
        trim: true,
    },
    empresa: {
        type: String,
        required: true
    },
    cargo: {
        type: String
    },
    email: {
        type: String,
    },
    telefone: {
        type: String,
        required: [true, 'O telefone é obrigatório'],
        trim: true
    },
    observacao: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    }

});

module.exports = mongoose.model('Cadastro', schema);