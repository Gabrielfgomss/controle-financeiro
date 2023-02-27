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
        
        this.#mercadoriaView = new MercadoriaView();
        
        this.#transacao = new Bind(
            new Transacao(),
            this.#mercadoriaView,
            ['criarTransacao', 'apagarLista']
        )
        
        this.#mercadoriaView.templateMenu(window.screen.width)
    }

    
    criarLista(event) {
        console.log(this.#transacao)
        event.preventDefault();

        if (ValidacaoHelper.seOsValoresExistem(this.#inputNome, this.#inputValor)) {
            
            this.#transacao.criarTransacao(this.#adicionarValores());
            
            this.#limpaFormulario()
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