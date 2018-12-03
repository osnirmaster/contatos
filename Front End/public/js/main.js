$('.btn-salvar').on('click', request);
$('#btn-consultar').on('click', consultarContato);
$('#btn-atualizar').on('click', atualizarContato);
$('#btn-deletar').on('click', deletarContato);
$('#btn-consultarTodos').on('click', consultatTodos);
$('#btn-cancelar').on('click', limparForm);

function montarRequisicao() {

    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var empresa = $('#empresa').val();
    var cargo = $('#cargo').val();
    var email = $('#email').val();
    var telefone = $('#telefone').val();
    var observacao = $('#observacao').val();

    var data = {
        first_name: first_name,
        last_name: last_name,
        empresa: empresa,
        cargo: cargo,
        email: email,
        telefone: telefone,
        observacao: observacao
    };

    return data
}

function request() {
    var data = montarRequisicao();
    console.log("clicou");
    $.post('http://localhost:3000/cadastrar', data, function() {
        console.log(JSON.stringify(data));
    });
}

function consultarContato() {
    var data = montarRequisicao();
    console.log(data)
    $.post('http://localhost:3000/contatos/buscar', data, function(response) {

        console.log(response);

        $('#first_name').val(response[0].first_name);
        $('#last_name').val(response[0].last_name);
        $('#empresa').val(response[0].empresa);
        $('#cargo').val(response[0].cargo);
        $('#email').val(response[0].email);
        $('#telefone').val(response[0].telefone);
        $('#observacao').val(response[0].observacao);

        localStorage.clear();
        localStorage.setItem('contato', JSON.stringify(response));
    })
}

function atualizarContato() {

    var contato = montarRequisicao();
    var id = JSON.parse(localStorage.getItem('contato'))[0]._id;

    console.log(id);

    $.post('http://localhost:3000/contatos/alterar/' + id, contato, function(response) {

        console.log(response);

    });

}

function deletarContato() {

    var id = JSON.parse(localStorage.getItem('contato'))[0]._id;
    console.log('tentando excluir: ' + id)

    $.post('http://localhost:3000/contatos/excluir/' + id, function(response) {

        console.log(response);

    });
}

function consultatTodos() {

    $('.tabelaContato').find('tr').remove();

    $.get('http://localhost:3000/contatos/consultar', function(response) {

        $(response).each(function() {
            var linha = novaLinha(this);
            $('.tabelaContato').append(linha);
        });
    })
}

function novaLinha(data) {

    var linha = $('<tr>');
    var nome = $('<td>').text(data.first_name);
    var empresa = $('<td>').text(data.empresa);
    var cargo = $('<td>').text(data.cargo);

    linha.append(nome);
    linha.append(empresa);
    linha.append(cargo);

    return linha;
};

function limparForm () {
    $('.form-contato input').val("");
  }