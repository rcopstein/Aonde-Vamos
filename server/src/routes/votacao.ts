import { Express } from 'express';
import VotacaoController from '../controllers/votacao';
import VotoController from '../controllers/votacao';

import { mdValidaIP } from '../middleware/ip';
import { mdValidarRestaurante } from '../middleware/restaurante';
import { ActionForbiddenError } from '../errors/actionForbiddenError';
import { InvalidParameterError } from '../errors/invalidParameterError';
import { mdValidarData, mdAdicionarDataAtual } from '../middleware/data';

export function Init(app : Express) {

    app.get('/votacao/:ano/:mes/:dia', mdValidarData, mdValidaIP, (req, res) => { 
        
        let ip = req.params.interno.ip;
        let data = req.params.interno.data;
        let result = VotacaoController.getStatus(data, ip);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.json(result);

    });

    app.get('/votacao/:ano/:mes/:dia/votos', mdValidarData, (req, res) => { 
        
        var data = req.params.interno.data;
        var result = VotoController.listVotos(data);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.send(result);

    });

    app.get('/votacao/:ano/:mes/:dia/resultado', mdValidarData, (req, res) => { 
        
        var data = req.params.interno.data;
        var result = VotacaoController.getResultado(data);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.json(result);

    });

    app.get('/votacao/:ano/:mes/:dia/candidatos', mdValidarData, (req, res) => {

        var data = req.params.interno.data;
        var result = VotacaoController.listCandidatos(data);

        res.json(result);

    });

    app.post('/votacao/:ano/:mes/:dia', mdValidarData, mdAdicionarDataAtual, mdValidaIP, mdValidarRestaurante, (req, res) => {
        
        let ip = req.params.interno.ip;
        let data = req.params.interno.data;
        let restaurante = req.params.interno.restaurante;
        let dataVoto = req.params.interno.dataAtual || new Date();

        try {
            VotoController.addVoto(data, dataVoto, ip, restaurante);
            res.sendStatus(200);
        }
        catch (e) {
            if (e instanceof InvalidParameterError) res.status(400).send(e.message);
            else if (e instanceof ActionForbiddenError) res.status(403).send(e.message);
            else res.sendStatus(500);
        }

    });

}