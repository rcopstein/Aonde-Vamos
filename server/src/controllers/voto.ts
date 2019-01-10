import { mesmoDia } from "../util";
import { Voto } from "../models/voto";
import { Usuario } from "../models/usuario";
import { Restaurante } from "../models/restaurante";

export class VotoController {

    // Variaveis

    _votos : Array<Voto>;

    // Metodos

    public listVotosPorDia(data : Date) : Array<Voto> {

        var result = new Array<Voto>();
        this._votos.forEach( item => { if (mesmoDia(item.dataVotacao, data)) result.push(item); });
        return result;

    }

    public getVoto(data : Date, usuario : Usuario) : Voto | null {

        var result = this._votos.find( item => mesmoDia(data, item.dataVotacao) && item.usuario == usuario );
        return result ? result : null;

    }

    public addVoto(dataVotacao : Date, dataVoto : Date, usuario : Usuario, restaurante : Restaurante) {

        this._votos.push(new Voto(dataVotacao, dataVoto, usuario, restaurante));

    }

    public count() : number {

        return this._votos.length;

    }

    // Construtor

    constructor() {
        this._votos = new Array<Voto>();
    }

}

let controller = new VotoController();
export default controller;