import { mesmoDia } from "../util";
import { Votacao } from "../models/votacao";
import { Restaurante } from "../models/restaurante";

export class VotacaoController {

    // Variaveis

    _votacoes : Array<Votacao>;

    // Metodos

    public listVotacoes(offset : number = 0, length : number = 10) : Array<Votacao> {

        if (length == 0 || offset >= this._votacoes.length) return [];

        var result = [];
        for (var i = Math.min(this._votacoes.length, offset + length) - 1; i >= offset; i--) result.push(this._votacoes[i]);
        return result;

    }

    public listVotacoesPorSemana(semana : number) : Array<Votacao> {

        var result = new Array<Votacao>();
        this._votacoes.forEach( item => { if (item.semana == semana) result.push(item); });
        return result;

    }

    public getVotacaoPorDia(data : Date) : Votacao | null {

        return this._votacoes.find( item => mesmoDia(data, item.data) );

    }

    public addVotacao(data : Date) {

        this._votacoes.push(new Votacao(data));

    }

    public count() : number {

        return this._votacoes.length;

    }

    // Construtor

    constructor() {
        this._votacoes = new Array<Votacao>();
        this.addVotacao(new Date(2019,  0,  9));
        this.addVotacao(new Date(2019,  0,  7));
        this.addVotacao(new Date(2019, 11,  9));
        this.addVotacao(new Date(2019, 11, 10));
        this.addVotacao(new Date(2018, 11, 12));
    }

}