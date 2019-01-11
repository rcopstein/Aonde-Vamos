import { Restaurante } from "./restaurante";

export interface Votacao {

    // Variaveis

    _data : Date;
    _final : Date;
    _inicio : Date;
    _vencedor : Restaurante;
    _totalVotos : Array<[string, number]>;

}