export class ProxyFactory {

    static createProxy(objetoProxy, props, acaoExecutada) {

        return new Proxy(objetoProxy, {

            get(target, propName, receiver) {

                if (props.includes(propName) && typeof (target[propName] == 'function')) {

                    return function () {

                        Reflect.apply(target[propName], target, arguments)
                        return acaoExecutada(target)
                    }
                }
                
                return target[propName]
            }
        })
    }
}