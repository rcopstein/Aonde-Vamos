import { Restaurante } from "./restaurante";

export class Votacao {

    // Variaveis

    private _totalVotos : Array<[string, number]>;

    // Propriedades

    get data() : Date {
        return this._data;
    }

    get vencedor() : Restaurante {
        return this._vencedor;
    }

    get totalVotos() : Array<[string, number]> {
        return this._totalVotos;
    }

    // Construtor

    constructor(private _data : Date, private _vencedor : Restaurante, contagem : Map<string, number>) {
        this._totalVotos = Array.from(contagem.entries());
    }

}