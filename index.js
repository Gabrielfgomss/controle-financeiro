//Variaveis globais
const operador = document.getElementById('select--transacao');
const produto = document.querySelector('.input-mercadoria');
const valor = document.querySelector('.input-valor');
const extratoLista = document.querySelector('.container__lista');
const botaoAdicionar = document.querySelector('.botao__comprar');
// Mensagem de aviso
mensagemAviso();
function mensagemAviso() {
    extratoLista.innerHTML = `
        <span id="msn__extrato" class="aparece">Nenhuma transação cadastrada.</span>
    `;
}
//Verifica o localStorage
var itens = JSON.parse(localStorage.getItem('itens')) || [];
if (itens.length > 0) {
    document.querySelector('.resultado').innerText = localStorage.getItem('resultado');
    document.querySelector('.saldo').textContent = localStorage.getItem('saldo');
    criaLinha(itens);
}
// Clicar no botão
botaoAdicionar.addEventListener('click', () => {
    if ((produto.value != '') && (valor.value != '')) {
        var item = {
            operador: operador.value, 
            produto: produto.value, 
            valor: parseFloat(valor.value.replace(/[R$ .]/g,'').replace(/[,]/g, '.')),
        };
        verificacaoDoValor();
        itens.push(item);
        localStorage.setItem('itens', JSON.stringify(itens));
        criaLinha();
    } else {
        verificacaoDoValor();
    }
}
)
// Valor invalido
function verificacaoDoValor() {
    if (valor.value == '') {
        valor.placeholder = 'Insira algum valor!';
        valor.classList.add('input-erro');
    } 
    if (produto.value == '') {
        produto.placeholder = 'Insira algum valor!';
        produto.classList.add('input-erro');
    } 
    if ((valor.value != '') && (produto.value != '')) {
        valor.classList.remove('input-erro');
        valor.placeholder = 'Nome da mercadoria';
        produto.classList.remove('input-erro');
        produto.placeholder = 'R$ 0,00';
        produto.value = '';
        valor.value = ''; 
    }
}
// Máscara e função para não permitir letras no input Valor
function maskValor(event) {
    const onlyDigits = event.target.value
          // Transformando a String digitada em uma Array
        .split("")
          // Filtrando a Array e pegando apenas o que for digito
        .filter(s => /\d/.test(s))
          //Juntando tudo na Array em uma String
        .join("")
          // Adicionado os zeros
        .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat);
    }
    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }      
// Criando os novos elementos adicionados na página
function criaLinha() {
    extratoLista.innerHTML = '';
    itens.forEach(element => {
        extratoLista.innerHTML += `
        <div class="linha">
            <p class="operador">${element.operador}</p>
            <p class="produto">${element.produto}</p>
            <p class="valor">${maskCurrency(element.valor)}</p>
        </div>
        `
    })
    //calcula resultado
    var saldo = 0;
    itens.forEach(i => {
        saldo = i.operador == '+' ? saldo + i.valor: saldo - i.valor;
    });
    document.querySelector('.resultado').innerText = maskCurrency(saldo);
    localStorage.setItem('resultado', maskCurrency(saldo));
    // Resultado de lucro ou prejuízo
    if (saldo > 0) {
        document.querySelector('.saldo').textContent = '[LUCRO]';
    } else if (saldo < 0 ) {
        document.querySelector('.saldo').textContent = '[PREJUÍZO]';
    } else if (saldo == 0) {
        document.querySelector('.saldo').textContent = '';
    }
    localStorage.setItem('saldo', document.querySelector('.saldo').textContent);
}
// Limpa dados
function limpaDados(evento) {
    evento.preventDefault();
    if (confirm('Você deseja apagar todos os dados?')) {
        localStorage.clear();
        itens = [];
        mensagemAviso();
        document.querySelector('.resultado').innerText = 'R$ 0,00';
        document.querySelector('.saldo').textContent = '';
    }
}
