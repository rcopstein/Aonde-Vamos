import { Express } from 'express';
import VotacaoController from '../controllers/votacao';

import { mdValidarData } from './data';

export function Init(app : Express) {

    app.get('/votacao', mdValidarData, (req, res) => { 
        
        var data = req.params.interno.data;
        var result = VotacaoController.getVotacaoPorDia(data);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.json(result);

    });

    app.get('/votacao/candidatos', mdValidarData, (req, res) => {

        var data = req.params.interno.data;
        var result = VotacaoController.listCandidatosPorDia(data);

        res.json(result);

    });

}