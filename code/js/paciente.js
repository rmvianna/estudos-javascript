class Paciente {

    static #LIMITE_PESO = 500;
    static #LIMITE_ALTURA = 3;

    constructor(peso, altura) {
        this._peso = parseFloat(this.#validarPeso(peso));
        this._altura = parseFloat(this.#validarAltura(altura));
    }

    get peso() {return this._peso;}
    get altura() {return this._altura;}
    get imc() {return (this.peso / (this.altura * this.altura)).toFixed(2);}

    #validarPeso(peso) {
        if (!this.#ehNumeroValido(peso, Paciente.#LIMITE_PESO)) {
            throw new Error("O peso '" + peso + "' não é válido");
        }

        return peso;
    }

    #validarAltura(altura) {
        if (!this.#ehNumeroValido(altura, Paciente.#LIMITE_ALTURA)) {
            throw new Error("A altura '" + altura + "' não é válida");
        }

        return altura;
    }

    #ehNumeroValido(numero, limiteSup) {
        return !isNaN(numero) && numero > 0 && numero < limiteSup;
    }

}