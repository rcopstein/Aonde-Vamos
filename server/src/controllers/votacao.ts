import { mesmoDia, addDias, addHoras, addMinutos } from "../util";
import { Voto } from "../models/voto";
import { Votacao } from "../models/votacao";
import { Usuario } from "../models/usuario";
import { Restaurante } from "../models/restaurante";
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
        let dia = (data.getDay() + 1) % 8;

        for (var i = 1; i <= dia; i++) {
            var votacao = this.getResultado(addDias(data, -i));
            exvencedores.push(votacao.vencedor);
        }

        // Remover esses restaurantes da lista
        restaurantes = restaurantes.filter( i => exvencedores.filter( j => i == j ).length == 0 );

        // Devolver os restaurantes restantes
        return restaurantes;

    }

    getResultado(data : Date) : Votacao {

        // Encontrar todos os votos naquele dia
        let votos = this.listVotos(data);

        // Calcular o vencedor
        let resultado = this.calculaVencedor(votos);

        // Calcular as datas de início e final
        let intervalo = this.getIntervaloVotacao(data);

        // Criar objeto Votacao
        let votacao = new Votacao(data, intervalo[1], intervalo[0], resultado[0], resultado[1]);

        // Retornar
        return votacao;

    }

    getVoto(data : Date, usuario : Usuario) : Voto | null {

        var result = this._votos.find( item => mesmoDia(data, item.dataVotacao) && item.usuario == usuario );
        return result ? result : null;

    }

    getIntervaloVotacao(data : Date) : [Date, Date] {

        var inicio = new Date(data.getTime());
        inicio = addHoras(inicio, 12);
        inicio = addDias(inicio, -1);

        var fim = new Date(data.getTime());
        fim = addHoras(fim, 12);

        return [inicio, fim];

    }

    addVoto(dataVotacao : Date, dataVoto : Date, usuario : Usuario, restaurante : Restaurante) {

        this._votos.push(new Voto(dataVotacao, dataVoto, usuario, restaurante));

    }

    count() : number {

        return this._votos.length;

    }

    // Construtor

    constructor(private restauranteController : RestauranteController) {
        this._votos = new Array<Voto>();
    }

}

let controller = new VotacaoController(_RestauranteController);
export default controller;