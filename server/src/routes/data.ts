import { Request, Response, NextFunction } from 'express';

export function mdValidarData(req : Request, res : Response, next : NextFunction) {

    // Criar variável data
    var data : Date;

    // Montar objeto data
    if (req.body.data) data = new Date(req.body.data);
    else return res.status(400).send("Parâmetro 'data' não foi encontrado na requisição!");

    // Validar objeto data
    if (!data || !(data instanceof Date) || isNaN(data.getTime())) return res.status(400).send("Parâmetro 'data' é inválido!");

    // Associar data à requisição
    if (!req.params.interno) req.params.interno = {};
    req.params.interno.data = data;

    // Continuar
    next();

}

export function mdAdicionarDataAtual(req : Request, res : Response, next : NextFunction) {

    // Verificar a existência de um campo 'dataAtual'
    if (req.body.dataAtual) {

        // Criar uma data com o valor determinado
        let data = new Date(req.body.dataAtual);

        // Validar objeto data
        if (!data || !(data instanceof Date) || isNaN(data.getTime())) return res.status(400).send("Parâmetro 'dataAtual' é inválido!");

        // Associar data à requisição
        if (!req.params.interno) req.params.interno = {};
        req.params.interno.dataAtual = data;

    }

    // Continuar
    next();

}