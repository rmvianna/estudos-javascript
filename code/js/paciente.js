class Paciente {

    static #LIMITE_PESO = 500;
    static #LIMITE_ALTURA = 3;
    static #LIMITE_GORDURA = 100;

    constructor(nome, peso, altura, gordura) {
        this._nome = nome;
        this._peso = peso;
        this._altura = altura;
        this._gordura = gordura;
    }

    get nome() {return this._nome;}
    get peso() {return this._peso;}
    get altura() {return this._altura;}
    get gordura() {return this._gordura;}
    
    get imc() {
        if (this.ehPesoValido() && this.ehAlturaValida()) {
            return (this.peso / (this.altura * this.altura)).toFixed(2);
        }

        throw new Error("Não é possível calcular IMC, pois peso e/ou altura é inválido");
    }

    ehPesoValido() {
        return this.#ehNumeroValido(this.peso, Paciente.#LIMITE_PESO);
    }

    ehAlturaValida() {
        return this.#ehNumeroValido(this.altura, Paciente.#LIMITE_ALTURA);
    }

    ehGorduraValida() {
        return this.#ehNumeroValido(this.gordura, Paciente.#LIMITE_GORDURA);
    }

    #ehNumeroValido(numero, limiteSup) {
        return !isNaN(numero) && numero > 0 && numero < limiteSup;
    }

}