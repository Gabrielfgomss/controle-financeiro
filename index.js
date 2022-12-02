//Variaveis gerais e localStorage
const extrato = document.querySelector('.container__lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
const span = document.querySelector('.msn__span');
itens.forEach(element => {
    console.log('Local'+element)
    criaElementos(element)
});
// Mensagem de extrato vazio
    if (extrato.innerText == '') {
        span.classList.remove('existe');
    }
// Selecionar o tipo de transação, o nome da mercadoria e seu valor
const compraVenda = document.getElementById('select--transacao');
const mercadoria = document.querySelector('.input-mercadoria');
const valor = document.querySelector('.input-valor');
// Clicar no botão
const botaoAdicionar = document.querySelector('.botao__comprar');
botaoAdicionar.addEventListener('click', () => {
    span.classList.add('existe');
    const transacaoValores = {
        compraVenda: compraVenda.value,
        mercadoria: mercadoria.value,
        valor: valor.value
    } 
    if ((valor.value != '')
    && (mercadoria.value != '')
    && (compraVenda.value != '')) {
            //testaFormulario();
            criaElementos(transacaoValores);
            itens.push(transacaoValores);
            calcResultado();
            console.log('Dinamico'+transacaoValores);
    }
    localStorage.setItem('itens', JSON.stringify(itens));
    mercadoria.value = '';
    valor.value = ''; 
}
)

// Validação do formulário
/*function testaFormulario () {
    var mercadoriaValue = /[^a-zA-z]+/g;
    var valorValue = /[^0-9,R$ ]+/g;
    if ((valorValue.test(transacao.valor.value))
    || (mercadoriaValue.test(transacao.mercadoria.value))) {
        console.log('Caracteres inválidos');
    } else {
        criaElementos(transacao);
    }
}*/
// Máscara e função para não permitir letras no input Valor
function testaValor(evento) {
    evento.preventDefault();
    var selector = document.querySelector('.input-valor');
    var mascara = new Inputmask("R$ 9{1,10}"+",9{1,2}");
    mascara.mask(selector);

    /*if (evento.target.value.length == 0) {
        evento.target.value += 'R'
    }
    if (evento.target.value.length == 1) {
        evento.target.value += '$ '
    }*/
    if ((/[0-9,R$ ]+/g).test(evento.key)) {
        evento.target.value += evento.key;
    }
}
// Criando os novos elementos adicionados na página
function criaElementos(transacao) {
    // Transformando o objecto em uma array
    //console.log(transacao);
    const valor = Object.values(transacao);
    //console.log(valor);
    // Criando a div
    const extratoLinha = document.createElement('div');
    extratoLinha.classList.add('linha');
    // Criando os paragrafos para cada valor na array
    for (let i = 0; i < valor.length; i++) {
        var itemLinha = document.createElement('p');
        itemLinha.innerHTML = valor[i];
        //console.log(itemLinha);
        itemLinha.dataset.id = i;
    // Criando as respectivas classes para seus respectivos paragrafos
        if (itemLinha.dataset.id == 0) {
            itemLinha.classList.add('operador');
        } else if (itemLinha.dataset.id == 1) {
            itemLinha.classList.add('produto');
        } else if (itemLinha.dataset.id == 2) {
            itemLinha.classList.add('valor');
        }
        extratoLinha.appendChild(itemLinha);
    }
    extrato.appendChild(extratoLinha);
}
// Limpa dados
function limpaDados() {
    if (extrato.innerText != '') {
        alert('Dados apagados com sucesso!');
        localStorage.clear();
    }
}