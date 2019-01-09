import { Restaurante } from "../models/restaurante";

export class RestauranteController {

    // Variaveis

    _restaurantes : Array<Restaurante>;

    // Metodos

    public listRestaurantes(offset : number = 0, length : number = 10) : Array<Restaurante> {

        if (length == 0 || offset >= this._restaurantes.length) return [];

        var result = [];
        for (var i = Math.min(this._restaurantes.length, offset + length) - 1; i >= offset; i--) result.push(this._restaurantes[i]);
        return result;

    }

    public getRestaurante(id : string) : Restaurante | null {

        return this._restaurantes.find( item => item.id == id );

    }

    public count() : number {

        return this._restaurantes.length;

    }

    // Construtor

    constructor() {
        this._restaurantes = new Array<Restaurante>();
        this._restaurantes.push(new Restaurante("1", "Palatus", "PUCRS", "Aquele que tem suco depois das 13:30"));
        this._restaurantes.push(new Restaurante("2", "Trinta e Dois", "PUCRS", "Aquele que a gente vai quando enjoa do Palatus"));
        this._restaurantes.push(new Restaurante("3", "Panorama", "PUCRS", "Aquele que a gente só vai de vez em quando porque é caro"));
    }

}