import { Voto } from "../models/voto";
import { Status } from "../models/status";
import { Votacao } from "../models/votacao";
import { Restaurante } from "../models/restaurante";
import { mesmoDia, addDias, addHoras, addMinutos } from "../util";
import { ActionForbiddenError } from "../errors/actionForbiddenError";
import { InvalidParameterError } from "../errors/invalidParameterError";
import _RestauranteController, { RestauranteController } from "./restaurante";

export class VotacaoController {

    // Variaveis

    _votos : Array<Voto>;

    // Metodos auxiliares

    private calculaVencedor(votos : Array<Voto>) : [Restaurante, Map<string, number>] {

        let ultData : Date = null;
        let maxVotos : number = 0;
        let vencedor : Restaurante = null;
        let contagem : Map<string, number> = new Map<string, number>();

        votos.forEach(item => {
            let cont = contagem.get(item.restaurante.id) | 0;
            cont += 1;

            contagem.set(item.restaurante.id, cont);

            let flag = false;
            if (cont > maxVotos) flag = true;
            else if (cont == maxVotos && item.dataVoto.getTime() < ultData.getTime()) flag = true;
            else if (cont == maxVotos && item.dataVoto.getTime() == ultData.getTime() && item.restaurante.nome < vencedor.nome) flag = true;
            
            if (flag) {
                ultData = ultData == null || item.dataVoto.getTime() > ultData.getTime() ? item.dataVoto : ultData;
                vencedor = item.restaurante;
                maxVotos = cont;
            }

        });

        return [vencedor, contagem];

    }

    // Metodos Publicos

    listVotos(data : Date) : Array<Voto> {

        var result = new Array<Voto>();
        this._votos.forEach( item => { if (mesmoDia(item.dataVotacao, data)) result.push(item); });
        return result;

    }

    listCandidatos(data : Date) : Array<Restaurante> {

        // Pegar a lista de todos os restaurantes
        var restaurantes = this.restauranteController.listRestaurantes();

        // Encontrar aqueles que já foram vencedores na semana corrente
        let exvencedores = new Array<Restaurante>();
        let dia = data.getDay();

        for (var i = dia; i > 0; --i) {
            var votacao = this.getResultado(addDias(data, -i));
            exvencedores.push(votacao.vencedor);
        }

        // Remover esses restaurantes da lista
        restaurantes = restaurantes.filter( i => !exvencedores.find( j => i == j ) );

        // Devolver os restaurantes restantes
        return restaurantes;

    }

    getStatus(data : Date, ip : string) : Status {

        let jaVotou = this.getVoto(data, ip) != null;
        let intervalo = this.getIntervaloVotacao(data);
        return new Status(data, intervalo[0], intervalo[1], jaVotou);

    }

    getResultado(data : Date) : Votacao {

        // Encontrar todos os votos naquele dia
        let votos = this.listVotos(data);

        // Calcular o vencedor
        let resultado = this.calculaVencedor(votos);

        // Criar objeto Votacao
        let votacao = new Votacao(data, resultado[0], resultado[1]);

        // Retornar
        return votacao;

    }

    getVoto(data : Date, ip : string) : Voto | null {

        var result = this._votos.find( item => mesmoDia(data, item.dataVotacao) && item.ip == ip );
        return result ? result : null;

    }

    getIntervaloVotacao(data : Date) : [Date, Date] {

        // Tratar o horário como um valor no UTC, adicionando o fuso horário

        var inicio = new Date(data.getTime());
        inicio.setUTCHours(0, 0, 0, 0);
        inicio = addDias(inicio, -1);
        inicio = addHoras(inicio, 12);
        inicio = addMinutos(inicio, inicio.getTimezoneOffset());

        var fim = new Date(data.getTime());
        fim.setUTCHours(0, 0, 0, 0);
        fim = addHoras(fim, 12);
        fim = addMinutos(fim, fim.getTimezoneOffset());

        return [inicio, fim];

    }

    addVoto(dataVotacao : Date, dataVoto : Date, ip : string, restaurante : Restaurante) {

        // Verifica se a data é válida
        let intervalo = this.getIntervaloVotacao(dataVotacao);
        if (intervalo[0].getTime() > dataVoto.getTime()) throw new ActionForbiddenError("Horário de votação ainda não iniciado!");
        if (intervalo[1].getTime() <= dataVoto.getTime()) throw new ActionForbiddenError("Horário de votação já encerrado!");

        // Verifica se já existe um voto desse IP
        let voto = this.getVoto(dataVotacao, ip);
        if (voto) throw new ActionForbiddenError("Já existe um voto registrado com esse IP");

        // Verifica se o restaurante é um candidato válido
        let candidato = this.listCandidatos(dataVotacao).find( i => i == restaurante);
        if (!candidato) throw new InvalidParameterError("Esse não é um candidato válido nessa votação");

        // Registra o voto
        this._votos.push(new Voto(dataVotacao, dataVoto, ip, restaurante));

    }

    count() : number {

        return this._votos.length;

    }

    clear() {

        this._votos = new Array<Voto>();
        
    }

    // Construtor

    constructor(private restauranteController : RestauranteController) {
        this._votos = new Array<Voto>();
    }

}

let controller = new VotacaoController(_RestauranteController);
export default controller;