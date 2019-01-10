import { mesmoDia } from "../util";
import { Voto } from "../models/voto";
import { UsuarioController } from "./usuario";
import { RestauranteController } from "./restaurante";

export class VotoController {

    // Variaveis

    _votos : Array<Voto>;

    // Metodos

    public listVotosPorDia(data : Date) : Array<Voto> {

        var result = new Array<Voto>();
        this._votos.forEach( item => { if (mesmoDia(item.data, data)) result.push(item); });
        return result;

    }

    public getVoto(data : Date, matricula : string) : Voto | null {

        var result = this._votos.find( item => mesmoDia(data, item.data) && item.usuario.matricula == matricula );
        return result ? result : null;

    }

    public addVoto(data : Date, matriculaUsuario : string, idRestaurante : string) : boolean {

        let usuarioController = new UsuarioController();
        let restauranteController = new RestauranteController();

        let usuario = usuarioController.getUsuario(matriculaUsuario);
        let restaurante = restauranteController.getRestaurante(idRestaurante);

        if (!usuario) return false;
        if (!restaurante) return false;

        this._votos.push(new Voto(data, usuario, restaurante));
        return true;

    }

    public count() : number {

        return this._votos.length;

    }

    // Construtor

    constructor() {
        this._votos = new Array<Voto>();
    }

}