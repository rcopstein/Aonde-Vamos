import { Express } from 'express';
import { VotacaoController } from '../controllers/votacao';

export function Init(app : Express) {
    
    let controller = new VotacaoController();

    app.get('/votacoes', (req, res) => { 
        res.send(controller.listVotacoes()); 
    });

    app.get('/votacoes/:semana', (req, res) => {

        var result = controller.listVotacoesPorSemana(req.params.semana);
        res.send(result);

    });

    app.get('/votacao/:ano/:mes/:dia', (req, res) => {

        var data = new Date(req.params.ano, req.params.mes, req.params.dia);
        if (!data) res.status(400).send('Parametros de data inválidos!');
        else {
            var result = controller.getVotacaoPorDia(data);
            if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
            else res.send(result);
        }
    });

}