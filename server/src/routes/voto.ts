import { Express, Request, Response, NextFunction } from 'express';
import VotoController from '../controllers/voto';
import VotacaoController from '../controllers/votacao';

import { mdValidarData } from './data';
import { mdValidarUsuario } from './usuario';
import { mdValidarRestaurante } from './restaurante';

export function mdValidaVoto(req : Request, res : Response, next : NextFunction) {

    let data = req.params.interno.data;
    let usuario = req.params.interno.usuario;
    let restaurante = req.params.interno.restaurante;

    let result = VotoController.getVoto(data, usuario);
    if (result) return res.status(403).send("Esse usuário já votou nessa votação!");

    let candidatos = VotacaoController.listCandidatosPorDia(data).filter( i => i == restaurante );
    if (candidatos.length == 0) return res.status(403).send("Não é possível votar nesse restaurante pois ele já foi escolhido essa semana!");

    next(); 

}

export function Init(app : Express) {

    app.get('/votos', mdValidarData, (req, res) => { 
        
        var data = req.params.interno.data;
        var result = VotoController.listVotosPorDia(data);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.send(result);

    });

    app.post('/votos', mdValidarData, mdValidarUsuario, mdValidarRestaurante, mdValidaVoto, (req, res) => {
        
        VotoController.addVoto(req.params.interno.data, new Date(), req.params.interno.usuario, req.params.interno.restaurante);
        res.sendStatus(200);

    });

}