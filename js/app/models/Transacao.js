class Transacao {
    #transacao;

    constructor() {
        
        this.#transacao = JSON.parse(localStorage.getItem('itens')) || [];
    }

    criarTransacao(item) {
        
        let {nome, tipo, valor} = item;

        let novoObj = {
            nome: nome,
            tipo: tipo,
            valor: valor
        };

        this.#transacao.push(novoObj);
        
        localStorage.setItem('itens', JSON.stringify(this.#transacao))
    }

    apagarLista() {

        if (confirm('Você deseja apagar todos os dados?')) {
            this.#transacao.length = 0;
        }
    }

    get transacao() {

        return [].concat(this.#transacao)
    }

    
}
    