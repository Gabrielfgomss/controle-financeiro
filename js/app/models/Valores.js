class Valores {
    #tipo;
    #nome;
    #valor;
    
    constructor(tipo, nome, valor) {

        this.#tipo = tipo;
        this.#nome = nome;
        this.#valor = valor;    
    }

    get tipo() {
        
        return this.#tipo
    }

    get nome() {

        return this.#nome
    }

    get valor() {

        return this.#valor
    }

}