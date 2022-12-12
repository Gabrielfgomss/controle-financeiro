// Calcula o resultado
function calcResultado() {
    var saldo = 0;
    var listaItens = JSON.parse(localStorage.getItem('itens'));

    listaItens.forEach(i => {
        if(i.operador == '+') {
           saldo = saldo + i.valor;
        }
        if (i.operador == '-') {
           saldo = saldo - i.valor
        }
    });

    localStorage.setItem('resultado', saldo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}));
    document.querySelector('.resultado').innerText = saldo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    if (saldo > 0) {
        document.querySelector('.saldo').textContent = '[LUCRO]';
    } else if (saldo < 0 ) {
        document.querySelector('.saldo').textContent = '[PREJUÍZO]';
    } else if (saldo == 0) {
        document.querySelector('.saldo').textContent = '';
    }

    localStorage.setItem('saldo', document.querySelector('.saldo').textContent);
}