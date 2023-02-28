var ConnectionFactory = (function () {

    const stores = ['itens'];
    const version = 2;
    const dbName = 'itensSalvos'

    var connection = null;
    var close = null;

    return class ConnectionFactory {
    
        static createStore(connection) {
    
            stores.forEach(store => {
    
                if(connection.objectStoreNames.contains(store)) {
    
                    connection.deleteObjectStore(store)
                } else {
                    connection.createObjectStore(store, { autoIncrement: true });
                }
            })
        }    
    
        static getConnection() {
    
            return new Promise((resolve, reject) => {
    
                let openRequest = window.indexedDB.open(dbName, version);
    
                openRequest.onupgradeneeded = e => {
    
                    console.log('Criar ou altera um banco');
                    ConnectionFactory.createStore(e.target.result)
                }
    
                openRequest.onsuccess = e => {
    
                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {

                            throw new Error('Você não pode fechar a conexão diretamente!')
                        }
                    }
                    resolve(connection);
                }
    
                openRequest.onerror = e => {
    
                    resolve(e.target.error);
                    reject(e.target.error.name);
                }
            })
        }

        static closeConnection() {

            if(connection) {
                close();
                connection = null;
            }
        }
    }
})();
