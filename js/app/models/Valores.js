class Valores {

    constructor(tipo, nome, valor) {

        this._tipo = tipo;
        this._nome = nome;
        this._valor = valor;    
        Object.freeze(this)
    }

    get tipo() {
        
        return this._tipo
    }

    get nome() {

        return this._nome
    }

    get valor() {

        return this._valor
    }

}