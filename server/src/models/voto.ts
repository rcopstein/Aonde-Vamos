import { Usuario } from "./usuario";
import { Restaurante } from "./restaurante";

export class Voto {

    // Variaveis

    private _dataVoto    : Date;
    private _dataVotacao : Date;
    private _usuario     : Usuario;
    private _restaurante : Restaurante;

    // Propriedades

    get dataVoto() : Date {
        return this._dataVoto;
    }

    get dataVotacao() : Date {
        return this._dataVotacao;
    }

    get usuario() : Usuario {
        return this._usuario;
    }

    get restaurante() : Restaurante {
        return this._restaurante;
    }

    // Construtor

    constructor(dataVotacao : Date, dataVoto : Date, usuario : Usuario, restaurante : Restaurante) {
        this._usuario = usuario;
        this._dataVoto = dataVoto;
        this._dataVotacao = dataVotacao;
        this._restaurante = restaurante;
    }

}