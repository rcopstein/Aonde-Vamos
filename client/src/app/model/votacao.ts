import { Restaurante } from "./restaurante";

export interface Votacao {

    // Variaveis

    _data : Date;
    _vencedor : Restaurante;
    _totalVotos : Array<[string, number]>;

}