class Bind {

    constructor(model, view, props) {
        let proxy = ProxyFactory.createProxy(model, props, model => 
            view.templateLista(model.transacao));
        
        view.templateLista(model.transacao);    

        return proxy;
    }
}