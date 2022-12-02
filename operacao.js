// Variaveis gerais
    const resultadoSelect = document.querySelector('.resultado');
    resultadoSelect.innerHTML = localStorage.getItem('resultado');
    document.querySelector('.saldo').textContent = localStorage.getItem('saldo');
function calcResultado() {
    const valoresSelect = document.querySelectorAll('.valor');
    const valorItem = /[R$ .,]/g;
    var resultadoCompra = 0;
    var resultadoVenda = 0;
    var resultadoTotal = 0;
    // Calcular os valores de cada valor, separando por aqueles de compra e venda
    for (let i = 0; i < valoresSelect.length; i++) {
        //console.log(i);
        if ((valorItem.test(valoresSelect[i].innerHTML))&&(valoresSelect[i].parentElement.childNodes[0].innerHTML=='+')) {
            var valorPositivo = Math.round(parseInt(valoresSelect[i].innerHTML.replace(valorItem, ''))*1)/100;
            //console.log(valorPositivo);  
            resultadoCompra = valorPositivo + resultadoCompra;
            //console.log(resultadoCompra); 
        }  
        if ((valorItem.test(valoresSelect[i].innerHTML))&&(valoresSelect[i].parentElement.childNodes[0].innerHTML=='-')) {
            var valorNegativo = Math.round(parseInt(valoresSelect[i].innerHTML.replace(valorItem, ''))*1)/100;
            //console.log(valorNegativo);
            resultadoVenda = valorNegativo + resultadoVenda;
            //console.log(resultadoVenda);
        }
    }
    // Calcular os valores de compra e venda
    resultadoTotal = resultadoCompra + (-resultadoVenda);
    //console.log(resultadoTotal);
    resultadoSelect.innerHTML = 'R$ ' + (resultadoTotal.toFixed(2));
    // Selecionar se deu lucro ou prejuizo
    if (resultadoTotal > 0) {
        document.querySelector('.saldo').textContent = '[LUCRO]';
    } else {
        document.querySelector('.saldo').textContent = '[PREJUÍZO]';
    }
    // Salvar resultado no localStorage e Lucro
    localStorage.setItem('resultado', resultadoSelect.innerHTML);
    localStorage.setItem('saldo', document.querySelector('.saldo').textContent);
}