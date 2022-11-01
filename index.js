const botaoMenu = document.querySelector('.botao__menulateral');
const menu = document.querySelector('.menu__lateral');
const botaoFechar = document.querySelector('.botao__fechar-img')

botaoMenu.addEventListener('click', () => {
    menu.classList.add('menu__lateral--ativo')
}
)

botaoFechar.addEventListener('click', () => {
    menu.classList.remove('menu__lateral--ativo')
})
