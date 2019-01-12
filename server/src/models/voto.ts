import { Restaurante } from "./restaurante";

export class Voto {

    // Variaveis

    private _dataVoto    : Date;
    private _dataVotacao : Date;
    private _ip          : string;
    private _restaurante : Restaurante;

    // Propriedades

    get dataVoto() : Date {
        return this._dataVoto;
    }

    get dataVotacao() : Date {
        return this._dataVotacao;
    }

    get ip() : string {
        return this._ip;
    }

    get restaurante() : Restaurante {
        return this._restaurante;
    }

    // Construtor

    constructor(dataVotacao : Date, dataVoto : Date, ip : string, restaurante : Restaurante) {
        this._ip = ip;
        this._dataVoto = dataVoto;
        this._dataVotacao = dataVotacao;
        this._restaurante = restaurante;
    }

}