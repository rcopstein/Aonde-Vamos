import { Restaurante } from "./restaurante";

export class Votacao {

    // Variaveis

    private _data : Date;
    private _final : Date;
    private _inicio : Date;
    private _vencedor : Restaurante;
    private _totalVotos : Array<[string, number]>;

    // Propriedades

    get data() : Date {
        return this._data;
    }

    get final() : Date {
        return this._final;
    }

    get inicio() : Date {
        return this._inicio;
    }

    get vencedor() : Restaurante {
        return this._vencedor;
    }

    get totalVotos() : Array<[string, number]> {
        return this._totalVotos;
    }

    // Construtor

    constructor(data : Date, final : Date, inicio : Date, vencedor : Restaurante, contagem : Map<string, number>) {
        this._data = data;
        this._final = final;
        this._inicio = inicio;
        this._vencedor = vencedor;
        this._totalVotos = Array.from(contagem.entries());
    }

}