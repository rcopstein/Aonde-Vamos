import { Express, Request, Response, NextFunction } from 'express';
import VotoController from '../controllers/voto';

import { mdValidarData } from './data';
import { mdValidarUsuario } from './usuario';
import { mdValidarRestaurante } from './restaurante';

export function mdValidaVoto(req : Request, res : Response, next : NextFunction) {

    let result = VotoController.getVoto(req.params.interno.data, req.params.interno.usuario);
    if (result) res.status(403).send("Esse usuário já votou nessa votação!");
    else next(); 

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