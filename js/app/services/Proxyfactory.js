class ProxyFactory {

    static createProxy(objetoProxy, props, acaoExecutada) {

        return new Proxy(objetoProxy, {

            get(target, propName, receiver) {

                if (props.includes(propName) && typeof (target[propName] == 'function')) {

                    return function () {

                        console.log(`${propName} interceptando prop`)
                        Reflect.apply(target[propName], target, arguments)
                        return acaoExecutada(target)
                    }
                }
                console.log(target[propName])
                return target[propName]
            }
        })
    }
}