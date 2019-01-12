import { Request, Response, NextFunction } from 'express';
import RestauranteController from '../controllers/restaurante';

export function mdValidarRestaurante(req : Request, res : Response, next : NextFunction) {

    // Encontrar o id do restaurante na requisição
    var idRestaurante = req.body.restaurante;
    if (!idRestaurante) return res.status(400).send("Parâmetro 'restaurante' não encontrado no corpo da requisição!");

    // Procurar restaurante equivalente
    let restaurante = RestauranteController.getRestaurante(idRestaurante);
    if (!restaurante) return res.status(404).send("Restaurante com id '" + idRestaurante + "' não encontrado!");

    // Atribuir o restaurante à requisição
    if (!req.params.interno) req.params.interno = {};
    req.params.interno.restaurante = restaurante;

    // Continuar
    next();

}