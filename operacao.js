// Calcula o resultado
function calcResultado() {
    var listaItens = itens;
    var saldo = 0;
    listaItens.forEach(i => {
        saldo = i.operador == '+' ? saldo + i.valor: saldo - i.valor;
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