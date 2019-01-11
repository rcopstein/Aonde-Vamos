import { Usuario } from "../models/usuario";

export class UsuarioController {

    // Variaveis

    _usuarios : Array<Usuario>;

    // Metodos

    public getUsuario(matricula : string) : Usuario | null {

        return this._usuarios.find( item => item.matricula == matricula );

    }

    // Construtor

    constructor() {
        this._usuarios = new Array<Usuario>();
        this._usuarios.push( new Usuario("João da Silva", "123456789-0") );
        this._usuarios.push( new Usuario("Paulo Fagundes", "847928374-5") );
        this._usuarios.push( new Usuario("Nicole Barros", "937291748-4") );
        this._usuarios.push( new Usuario("Janete Carvalho", "205748203-3") );
    }

}

let controller = new UsuarioController();
export default controller;