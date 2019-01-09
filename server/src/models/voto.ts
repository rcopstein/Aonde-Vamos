import { Usuario } from "./usuario";
import { Restaurante } from "./restaurante";

export class Voto {

    // Variaveis

    private _data : Date;
    private _usuario : Usuario;
    private _restaurante : Restaurante;

    // Propriedades

    get data() : Date {
        return this._data;
    }

    get usuario() : Usuario {
        return this._usuario;
    }

    get restaurante() : Restaurante {
        return this._restaurante;
    }

    // Construtor

    constructor(data : Date, usuario : Usuario, restaurante : Restaurante) {
        this._data = data;
        this._usuario = usuario;
        this._restaurante = restaurante;
    }

}