class Transacao {

    constructor() {
        
        this._transacao = [];
    }

    criarTransacao(item) {

        this._transacao.push(item);
    }

    apagarLista() {

        if (confirm('Você deseja apagar todos os dados?')) {
            this._transacao.length = 0;
        }
    }

    get transacao() {

        return [].concat(this._transacao)
    }

    
}
    