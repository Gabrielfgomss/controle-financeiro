class MercadoriaController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputTipo = $('#select--transacao');
        this._inputNome = $('.input-mercadoria');
        this._inputValor = $('.input-valor');

        this._mercadoriaView = new MercadoriaView();

        this._transacao = new Bind(
            new Transacao(),
            this._mercadoriaView,
            ['criarTransacao', 'apagarLista']
        )

        this._mercadoriaView.templateMenu(window.screen.width)

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new TransacaoDao(connection).listaItens().then(itens => {
                    itens.forEach(item => {
                        this._transacao.criarTransacao(item)
                    })
                })
            })
    }


    criarLista(event) {

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let transacao = this._adicionarValores();

                new TransacaoDao(connection)
                    .adiciona(transacao)
                    .then(() => {

                        if (ValidacaoHelper.seOsValoresExistem(this._inputNome, this._inputValor)) {
                            this._transacao.criarTransacao(transacao);
                            this._limpaFormulario()
                        }
                    })
            })
    }

    _adicionarValores() {

        return new Valores(
            this._inputTipo.value,
            this._inputNome.value,
            ValidacaoHelper.converterTextoParaNumero(this._inputValor.value)

        )
    }

    _limpaFormulario() {

        this._inputValor.value = '';
        this._inputNome.value = '';
        this._inputTipo.focus();
    }

    limparDados(event) {
        
        event.preventDefault();
        ConnectionFactory
            .getConnection()
            .then(connection => new TransacaoDao(connection))
            .then(dao => {
                this._transacao.apagarLista();
                dao.apagarItens();
            })
    }

    mostrarMenu(event) {

        this._mercadoriaView.templateMenu(event);
    }

    abrirOuFecharMenu(event) {

        this._mercadoriaView.aoClicarNoMenu(event.target.alt)
    }
}