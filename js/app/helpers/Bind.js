import { ProxyFactory } from "../services/Proxyfactory.js";

export class Bind {

    constructor(model, view, props) {
        let proxy = ProxyFactory.createProxy(model, props, model => 
            view.templateLista(model));
        
        view.templateLista(model);    

        return proxy;
    }
}