export class Restaurante {

    // Variaveis

    private _id : string;
    private _nome : string;
    private _endereco : string;
    private _descricao : string;

    // Propriedades

    get id() : string {
        return this._id;
    }

    get nome() : string {
        return this._nome;
    }

    get endereco() : string {
        return this._endereco;
    }

    get descricao() : string {
        return this._descricao;
    }

    // Construtor

    constructor(id : string, nome : string, endereco : string, descricao : string) {
        this._id = id;
        this._nome = nome;
        this._endereco = endereco;
        this._descricao = descricao;
    }

}