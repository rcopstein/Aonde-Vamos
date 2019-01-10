import { Voto } from "../models/voto";
import { Votacao } from "../models/votacao";
import { Restaurante } from "../models/restaurante";

import _VotoController, { VotoController } from '../controllers/voto';

export class VotacaoController {

    // Metodos

    private static calculaVencedor(votos : Array<Voto>) : [Restaurante, Map<string, number>] {

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

    public getVotacaoPorDia(data : Date) : Votacao {

        // Encontrar todos os votos naquele dia
        let votos = this.votoController.listVotosPorDia(data);

        // Calcular o vencedor
        let resultado = VotacaoController.calculaVencedor(votos);

        // Criar objeto Votacao
        let votacao = new Votacao(data, resultado[0], resultado[1]);

        // Retornar
        return votacao;

    }

    // Construtor

    constructor(private votoController : VotoController) {}

}

let controller = new VotacaoController(_VotoController);
export default controller;