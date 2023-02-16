class MercadoriaController {
    #inputTipo;
    #inputNome;
    #inputValor;
    #transacao;
    #mercadoriaView;

    constructor() {

        let $ = document.querySelector.bind(document);
        this.#inputTipo = $('#select--transacao');
        this.#inputNome = $('.input-mercadoria');
        this.#inputValor = $('.input-valor');

        this.#transacao = new Transacao();
        this.#mercadoriaView = new MercadoriaView();

        if(localStorage.length == 0) {
            this.#mercadoriaView.templateLista(this.#transacao.transacao)
        } else {
            this.#mercadoriaView.templateLista(this.#transacao.itens)
        }
        this.#mercadoriaView.templateMenu(window.screen.width)
    }

    
    criarLista(event) {

        event.preventDefault();

        if (ValidacaoHelper.seOsValoresExistem(this.#inputNome, this.#inputValor)) {
            
            this.#transacao.criarTransacao(this.#adicionarValores());
            this.#mercadoriaView.templateLista(this.#transacao.transacao);
            this.#limpaFormulario()
            this.#transacao.localStorage(this.#transacao.transacao)
        } 
    }

    #adicionarValores() {
        
        return new Valores(
            this.#inputTipo.value,
            this.#inputNome.value,
            ValidacaoHelper.converterTextoParaNumero(this.#inputValor.value)
        )
    }

    #limpaFormulario() {

        this.#inputValor.value = '';
        this.#inputNome.value = '';
        this.#inputTipo.focus();
    }

    limparDados(event) {

        event.preventDefault();
        this.#transacao.apagarLista();
        localStorage.clear();
        this.#mercadoriaView.templateLista(this.#transacao.transacao)
    }

    mostrarMenu(event) {
        
        this.#mercadoriaView.templateMenu(event);
    }

    abrirOuFecharMenu(event) {
        
        this.#mercadoriaView.aoClicarNoMenu(event.target.alt)
    }
}