$('.btn-salvar').on('click', request);
$('#btn-consultar').on('click', consultarContato);
$('#btn-atualizar').on('click', atualizarContato);
$('#btn-deletar').on('click', deletarContato);
$('#btn-consultarTodos').on('click', consultatTodos);
$('#btn-cancelar').on('click', limparForm);

$(function(){
    $('.idContato').on('click',removerContatoLista);

});



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
    $.post('http://localhost:3000/contatos/incluir', data, function() {
        console.log(JSON.stringify(data));
        limparForm();
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
            var id = this._id;
            console.log("Teste : " + id);

            linha.find('.botaoRemover').on('click',removerContatoLista);

            linha.find('.botaoRemover').click(removeLinha);

            $('.tabelaContato').append(linha);
        });
    })
};


function removerContatoLista(){

    var id = $(this).val();

    console.log('Teste parent : ' + id);

    $.post('http://localhost:3000/contatos/excluir/' + id, function(response,status){

        console.log("teste remocao: " +response + status);

     });
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}


function novaLinha(data) {

    var linha = $('<tr>');
    var id = $('<td>').addClass("idContato").text(data._id).hide();
    var nome = $('<td>').text(data.first_name);
    var empresa = $('<td>').text(data.empresa);
    var cargo = $('<td>').text(data.cargo);
    var colunaoAcao = $('<tr>');

    var link = $('<a>').attr("href","#").val(data._id).addClass("botaoRemover");
    var icone = $('<i>').addClass("material-icons").text("delete");

    link.append(icone);

    colunaoAcao.append(link);

    linha.append(id);
    linha.append(nome);
    linha.append(empresa);
    linha.append(cargo);
    linha.append(colunaoAcao);

    return linha;
};

function limparForm () {
    $('.form-contato input').val("");
  }
