class ValidacaoHelper {
    #form

    constructor() {

        this.#form = document.querySelector('form').elements;
    }

    static seOsValoresExistem(produto, valor) {

        if (produto.value && valor.value !== '') {
            
            valor.placeholder = 'R$ 0,00';
            produto.placeholder = 'Nome da mercadoria';
            produto.classList.remove('input-erro');
            valor.classList.remove('input-erro');
            return true
        } else {

            produto.placeholder = "Insira algum valor!"
            valor.placeholder = "Insira algum valor!"
            produto.classList.add('input-erro');
            valor.classList.add('input-erro');
            return false
        }

    }

    static mascaraDoValor(event) {
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

        function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency
            }).format(valor)
        }
    }
    
    static converterTextoParaNumero(valor) {
        return parseFloat(valor.replace(/[R$ .]/g,'').replace(/[,]/g, '.'))
    }
}