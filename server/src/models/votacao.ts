import { Usuario } from "./usuario";
import { Restaurante } from "./restaurante";
import { Voto } from "./voto";

export class Votacao {

    // Variaveis

    private _data : Date;
    private _votos : Array<Voto>;

    // Propriedades

    get data() : Date {
        return this._data;
    }

    get votos() : Array<Voto> {
        return this._votos;
    }

    // Metodos

    private verificaUsuarioDuplicado(voto : Voto) : boolean {
        let prevVoto = this._votos.filter( item => { return item.usuario == voto.usuario; } );
        if (prevVoto.length > 0) return true;
        return false;
    }

    private verificaDataMesmoDia(voto : Voto) : boolean {
        return voto.data.getFullYear() == this._data.getFullYear() &&
               voto.data.getMonth() == this._data.getMonth() &&
               voto.data.getDate() == this._data.getDate();
    }

    public addVoto(voto : Voto) : boolean {
        if (this.verificaUsuarioDuplicado(voto)) return false;
        if (!this.verificaDataMesmoDia(voto)) return false;
        this._votos.push(voto);
        return true;
    }

    public vencedor() : Restaurante | null {

        let ultData : Date = null;
        let maxVotos : number = 0;
        let vencedor : Restaurante = null;
        let contagem : Map<Restaurante, number> = new Map<Restaurante, number>();

        this._votos.forEach(item => {
            let cont = contagem.get(item.restaurante) | 0;
            cont += 1;

            contagem.set(item.restaurante, cont);

            let flag = false;
            if (cont > maxVotos) flag = true;
            else if (cont == maxVotos && item.data < ultData) flag = true;
            else if (cont == maxVotos && item.data == ultData && item.restaurante.nome < vencedor.nome) flag = true;
            
            if (flag) {
                vencedor = item.restaurante;
                ultData = item.data;
                maxVotos = cont;
            }

        });

        return vencedor;

    }

    // Construtor

    constructor(data : Date) {
        this._data = data;
        this._votos = new Array<Voto>();
    }

}