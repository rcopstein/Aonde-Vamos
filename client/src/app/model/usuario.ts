export class Usuario {

    // Variaveis

    private _nome : string;
    private _matricula : string;

    // Propriedades

    get nome() : string {
        return this._nome;
    }

    get matricula() : string {
        return this._matricula;
    }

    // Construtor

    constructor(nome : string, matricula : string) {
        this._nome = nome;
        this._matricula = matricula;
    }

}