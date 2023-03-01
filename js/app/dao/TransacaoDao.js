import { Valores } from "../models/Valores.js";

export class TransacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'itens'
    }

    adiciona(transacao) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(transacao);
            
            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação')
            };
        })
    }

    listaItens() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let itensDaStore = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if (atual) {

                    let dado = atual.value;

                    itensDaStore.push(new Valores(dado._tipo, dado._nome, dado._valor));

                    atual.continue();

                } else {

                    resolve(itensDaStore);
                }
            };
 
            cursor.onerror = e => {

                console.log(e.target.error.name);
                reject('Não foi possível lista')
            }
        })
    }

    apagarItens() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Itens removidas!');

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível remover os itens')
            };

        })
    }
}
