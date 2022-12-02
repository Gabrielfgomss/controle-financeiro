// Menu mobile interativo
const botaoMenu = document.querySelector('.botao__menulateral');
const menu = document.querySelector('.container__menu');
const botaoFechar = document.querySelector('.botao__fechar-img');

botaoMenu.addEventListener('click', () => {
    menu.classList.add('container__menu-ativo')
}
)

botaoFechar.addEventListener('click', () => {
    menu.classList.remove('container__menu-ativo')

}
)