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

        let result = this._restaurantes.find( item => item.id == id );
        if (result) return result;
        return null;

    }

    public addRestaurante(restaurante : Restaurante) {

        this._restaurantes.push(restaurante);

    }

    public count() : number {

        return this._restaurantes.length;

    }

    // Construtor

    constructor() {
        this._restaurantes = new Array<Restaurante>();
    }

}

let controller = new RestauranteController();

controller.addRestaurante(new Restaurante("1", "Palatus", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que tem suco depois das 13:30"));
controller.addRestaurante(new Restaurante("2", "Trinta e Dois", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que a gente vai quando enjoa do Palatus"));
controller.addRestaurante(new Restaurante("3", "Panorama", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que a gente só vai de vez em quando porque é caro"));
controller.addRestaurante(new Restaurante("4", "La Pizza Mia", "R. Carlos Trein Filho, 91 - Auxiliadora, Porto Alegre - RS, 90450-120", "Aquele que dá pra pedir 2km de pizza"));
controller.addRestaurante(new Restaurante("5", "Spoiler", "R. Gen. Lima e Silva, 1058 - Centro Histórico, Porto Alegre - RS, 90050-102", "Aquele que te conta o final de Game of Thrones"));
controller.addRestaurante(new Restaurante("6", "Koh Pee Pee", "R. Schiller, 83 - Rio Branco, Porto Alegre - RS, 90430-150", "Aquele que tu tem que levar um rim extra pra pagar"));

export default controller;