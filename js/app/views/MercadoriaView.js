import { currentInstance } from "../controllers/MercadoriaController.js";

export class MercadoriaView {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._lista = $('.container__lista');
        this._resultado = $('.resultado');
        this._menu = $('.container__menu');
        
        this._menu.addEventListener('click', function(event) {

            if(event.target.nodeName == 'BUTTON') {

                currentInstance().limparDados(event)
            }
        })
    }

    templateLista(transacoes) {
        
        if (transacoes.transacao.length == 0) {

            this._lista.innerHTML = '<span id="msn__extrato" class="aparece">Nenhuma transação cadastrada.</span>';
            this._resultado.innerText = 'R$ 0,00'
        } else {

            this._lista.innerHTML =
                transacoes.transacao.map((transacao) => `
                    <div class="linha">
                        <p class="operador">${transacao._tipo}</p>
                        <p class="produto">${transacao._nome}</p>
                        <p class="valor">${transacao._valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                `).join('');

            this._resultado.innerText =
                transacoes.transacao.reduce(
                    (total, transacao) =>
                        transacao.tipo == '+' ?
                            total + Number(transacao._valor) :
                            total - Number(transacao._valor), 0
                ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }
    }

    templateMenu(windowWidth) {

        if (windowWidth > 768) {
            this._menu.innerHTML = `
            
                <a href="#" class="menu-link borda">Cadastro de transações</a>
                <button class="menu__botao">Limpar dados</button>
            `;
            
        } else if (windowWidth < 768){

            this._menu.innerHTML = `
                <button class="botao__abrir" onclick="mercadoriaController.abrirOuFecharMenu(event)">
                    <img src="img/menu.png" alt="Abrir menu">
                </button> 
                
            `
        }
    }

    aoClicarNoMenu(altString) {
        
        if(altString == 'Abrir menu') {
            this._menu.classList.add('container__menu-ativo');
            this._menu.innerHTML = `
                <button class="botao__abrir" onclick="mercadoriaController.abrirOuFecharMenu(event)">
                    <img class="botao__fechar" src="img/Vector.png" alt="Fechar menu">
                </button>
                <a href="#" class="menu-link borda">Cadastro de transações</a>
                <button onclick="mercadoriaController.limparDados(event)" class="menu__botao">Limpar dados</button>
        `  
        } else if(altString == 'Fechar menu') {

            this._menu.classList.remove('container__menu-ativo');
            this._menu.innerHTML = `
                <button class="botao__abrir" onclick="mercadoriaController.abrirOuFecharMenu(event)">
                    <img src="img/menu.png" alt="Abrir menu">
                </button>  
            `
        }
    }
}