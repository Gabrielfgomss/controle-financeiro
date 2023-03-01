import { currentInstance } from './controllers/MercadoriaController.js';
import { ValidacaoHelper } from './helpers/ValidacaoHelper.js';


let mercadoriaController = currentInstance();

document.querySelector('body').onresize = (event) => mercadoriaController.mostrarMenu(event.target.innerWidth);

document.querySelector('.lista__input').onsubmit = (event) => mercadoriaController.criarLista(event);

document.querySelector('.input-valor').oninput = (event) => ValidacaoHelper.mascaraDoValor(event);
