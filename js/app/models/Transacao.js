class Transacao {
    #transacao;
    #itensLocalStorage

    constructor() {
        
        this.#transacao = []
        this.#itensLocalStorage = JSON.parse(localStorage.getItem('itens')) || [];
    }

    criarTransacao(item) {
        
        this.#transacao.push(item);
    }

    apagarLista() {

        if (confirm('Você deseja apagar todos os dados?')) {
            this.#transacao.length = 0;
        }
    }

    localStorage(transacao) {

        let ultimaTransacao = transacao.slice(-1);
        let {nome, tipo, valor} = ultimaTransacao[0];
        let novoObj = {
            nome: nome,
            tipo: tipo,
            valor: valor
        }
        this.#itensLocalStorage.push(novoObj);
        localStorage.setItem('itens', JSON.stringify(this.#itensLocalStorage))
    }

    get transacao() {

        return [].concat(this.#transacao)
    }

    get itens() {

        return [].concat(this.#itensLocalStorage)
    }
}
    