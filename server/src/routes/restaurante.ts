import { Express, Request, Response, NextFunction } from 'express';
import RestauranteController from '../controllers/restaurante';

export function mdValidarRestaurante(req : Request, res : Response, next : NextFunction) {

    // Encontrar o id do restaurante na requisição
    var idRestaurante = req.body.restaurante;
    if (!idRestaurante) { res.status(400).send("Parâmetro 'restaurante' não encontrado no corpo da requisição!"); return; }

    // Procurar restaurante equivalente
    let restaurante = RestauranteController.getRestaurante(idRestaurante);
    if (!restaurante) { res.status(404).send("Restaurante com id '" + idRestaurante + "' não encontrado!"); return; }

    // Atribuir o restaurante à requisição
    if (!req.params.interno) req.params.interno = {};
    req.params.interno.restaurante = restaurante;

    // Continuar
    next();

}

export function Init(app : Express) {

    app.get('/restaurantes', (req, res) => { 
        res.send(RestauranteController.listRestaurantes()); 
    });

    app.get('/restaurante/:id', (req, res) => { 
        var result = RestauranteController.getRestaurante(req.params.id);
        if (result == null) res.status(404).send("Restaurante '" + req.params.id + "' não foi encontrado!");
        else res.send(result); 
    });

}