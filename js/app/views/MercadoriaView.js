class MercadoriaView {
    #lista;
    #resultado;
    #menu;
    #botaoMenu

    constructor() {

        let $ = document.querySelector.bind(document);
        this.#lista = $('.container__lista');
        this.#resultado = $('.resultado');
        this.#menu = $('.container__menu');
        this.#botaoMenu = $('.botao__menulateral')
    }

    templateLista(transacoes) {

        if (transacoes.length == 0) {

            this.#lista.innerHTML = '<span id="msn__extrato" class="aparece">Nenhuma transação cadastrada.</span>';
        } else {

            this.#lista.innerHTML =
                transacoes.map((transacao) => `
                    <div class="linha">
                        <p class="operador">${transacao.tipo}</p>
                        <p class="produto">${transacao.nome}</p>
                        <p class="valor">${transacao.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                `).join('');

            this.#resultado.innerText =
                transacoes.reduce(
                    (total, transacao) =>
                        transacao.tipo == '+' ?
                            total + Number(transacao.valor) :
                            total - Number(transacao.valor), 0
                ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }
    }

    templateMenu(windowWidth) {

        if (windowWidth > 768) {
            this.#menu.innerHTML = `
            
                <a href="#" class="menu-link borda">Cadastro de transações</a>
                <button onclick="mercadoriaController.limparDados(event)" class="menu__botao">Limpar dados</button>
            `;
            
        } else if (windowWidth < 768){

            this.#menu.innerHTML = `
                <button class="botao__abrir" onclick="mercadoriaController.abrirOuFecharMenu(event)"><img src="img/menu.png" alt="Abrir menu"></button> 
                
            `
        }
    }

    aoClicarNoMenu(altString) {
        
        if(altString == 'Abrir menu') {
            this.#menu.classList.add('container__menu-ativo');
            this.#menu.innerHTML = `
                <button class="botao__abrir" onclick="mercadoriaController.abrirOuFecharMenu(event)"><img class="botao__fechar" src="img/Vector.png" alt="Fechar menu"></button>
                <a href="#" class="menu-link borda">Cadastro de transações</a>
                <button onclick="mercadoriaController.limparDados(event)" class="menu__botao">Limpar dados</button>
        `  
        } else if(altString == 'Fechar menu') {

            this.#menu.classList.remove('container__menu-ativo');
            this.#menu.innerHTML = `
                <button class="botao__abrir" onclick="mercadoriaController.abrirOuFecharMenu(event)"><img src="img/menu.png" alt="Abrir menu"></button>  
            `
        }
    }
}