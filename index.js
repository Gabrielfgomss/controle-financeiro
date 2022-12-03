//Variaveis gerais e localStorage
const extrato = document.querySelector('.container__lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
const span = document.querySelector('.msn__span');
itens.forEach(elemento => {
    criaElementos(elemento);
    calcResultado(Object.values(itens));
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
    const transacaoValores = {
        compraVenda: compraVenda.value,
        mercadoria: mercadoria.value,
        valor: valor.value.replace(/[R$ .]/g,'')
    }
    // Porque quando eu clico ainda adiciona um valor na string vazia  
    if ((valor.value != '')
    && (mercadoria.value != '')
    && (compraVenda.value != '')) {
            //testaFormulario();
            span.classList.add('existe');
            criaElementos(transacaoValores);
            itens.push(transacaoValores);
            calcResultado(Object.values(itens));
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
    var mascara = new Inputmask("R$ 9{1,9}"+",99");
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
    const valor = Object.values(transacao);
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
        } else if ((itemLinha.dataset.id == 2)) {
            itemLinha.classList.add('valor');
            itemLinha.innerHTML = valor[i].replace(/[,]/g, '.');
            itemLinha.innerHTML = parseFloat(valor[i]).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        }
        extratoLinha.appendChild(itemLinha);
    }
    extrato.appendChild(extratoLinha);
}
// Limpa dados
function limpaDados() {
    console.log(extrato.innerText);
    if (extrato.innerText != '') {
        alert('Dados apagados com sucesso!');
        localStorage.clear();
    }
}
// Calcula o resultado
function calcResultado(elemento) {
    const resultadoSelect = document.querySelector('.resultado');
    let resultadoCompra = 0;
    let resultadoVenda = 0;
    let resultadoTotal = 0;
    console.log(elemento)
// Calcular os valores totais de cada valor, separando por aqueles de compra e venda
    for (let i = 0; i < elemento.length; i++) {
        if (elemento[i].compraVenda == '+') {
            let valorCompra = parseFloat(elemento[i].valor.replace(/[,]+/g, '.')); 
            resultadoCompra = valorCompra + resultadoCompra;
        }
        if (elemento[i].compraVenda == '-') {
            let valorVenda = parseFloat(elemento[i].valor.replace(/[,]+/g, '.'));
            resultadoVenda = valorVenda + resultadoVenda;
        }
        }
// Calcular os resultado final
    resultadoTotal = resultadoCompra - resultadoVenda;
    resultadoSelect.innerHTML = resultadoTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
// Selecionar se deu lucro ou prejuizo
    if (resultadoTotal >= 0) {
        document.querySelector('.saldo').textContent = '[LUCRO]';
    } else {
        document.querySelector('.saldo').textContent = '[PREJUÍZO]';
    }
// Salvar resultado e saldo no localStorage
    localStorage.setItem('resultado', resultadoSelect.innerHTML);
    localStorage.setItem('saldo', document.querySelector('.saldo').textContent);
}