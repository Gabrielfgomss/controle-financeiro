import { MercadoriaView } from "../views/MercadoriaView.js";
import { Transacao } from "../models/Transacao.js";
import { Bind } from "../helpers/Bind.js";
import { ConnectionFactory } from "../services/ConnectionFactory.js";
import { TransacaoDao } from "../dao/TransacaoDao.js";
import { ValidacaoHelper } from "../helpers/ValidacaoHelper.js";
import { Valores } from "../models/Valores.js";

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

        this._init();
    }

    _init() {
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
                if (ValidacaoHelper.seOsValoresExistem(this._inputNome, this._inputValor)) {
                    new TransacaoDao(connection)
                        .adiciona(transacao)
                        .then(() => {
                            this._transacao.criarTransacao(transacao);
                            this._limpaFormulario()
                        })
                }
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

let mercadoriaController = new MercadoriaController();

export function currentInstance() {

    return mercadoriaController;
}