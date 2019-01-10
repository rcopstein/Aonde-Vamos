import { Express, Request, Response, NextFunction } from 'express';
import VotoController from '../controllers/votacao';
import VotacaoController from '../controllers/votacao';

import { mdValidarUsuario } from './usuario';
import { mdValidarRestaurante } from './restaurante';
import { mdValidarData, mdAdicionarDataAtual } from './data';

export function mdValidaVoto(req : Request, res : Response, next : NextFunction) {

    let data = req.params.interno.data;
    let usuario = req.params.interno.usuario;
    let restaurante = req.params.interno.restaurante;
    let dataVoto = req.params.interno.dataAtual || new Date();

    // Verifica se a data do voto é válida
    var intervalo = VotoController.getIntervaloVotacao(data);
    if (intervalo[0].getTime() > dataVoto.getTime()) return res.status(403).send("Horário de votação ainda não iniciado!");
    if (intervalo[1].getTime() <= dataVoto.getTime()) return res.status(403).send("Horário de votação já encerrado!");

    // Verifica se usuário já votou
    let result = VotoController.getVoto(data, usuario);
    if (result) return res.status(403).send("Esse usuário já votou nessa votação!");

    // Verifica se o restaurante é válido para a votação
    let candidatos = VotacaoController.listCandidatos(data).filter( i => i == restaurante );
    if (candidatos.length == 0) return res.status(403).send("Não é possível votar nesse restaurante pois ele não é um candidato nessa votação!");

    next(); 

}

export function Init(app : Express) {

    app.get('/votacao/:ano/:mes/:dia', mdValidarData, (req, res) => { 
        
        var data = req.params.interno.data;
        var result = VotacaoController.getResultado(data);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.json(result);

    });

    app.get('/votacao/:ano/:mes/:dia/votos', mdValidarData, (req, res) => { 
        
        var data = req.params.interno.data;
        var result = VotoController.listVotos(data);

        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.send(result);

    });

    app.get('/votacao/:ano/:mes/:dia/candidatos', mdValidarData, (req, res) => {

        var data = req.params.interno.data;
        var result = VotacaoController.listCandidatos(data);

        res.json(result);

    });

    app.post('/votacao/:ano/:mes/:dia', mdValidarData, mdAdicionarDataAtual, mdValidarUsuario, mdValidarRestaurante, mdValidaVoto, (req, res) => {
        
        let dataVoto = req.params.interno.dataAtual || new Date();
        VotoController.addVoto(req.params.interno.data, dataVoto, req.params.interno.usuario, req.params.interno.restaurante);
        res.sendStatus(200);

    });

}