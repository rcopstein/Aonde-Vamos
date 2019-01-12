import { InvalidParameterError } from '../errors/invalidParameterError';
import { Request, Response, NextFunction } from 'express';
import { Data } from '../models/data';
import { addMinutos } from '../util';

export function mdValidarData(req : Request, res : Response, next : NextFunction) {

    // Criar variável data
    var data : Date;

    // Encontrar os parâmetros da requisição
    if (!req.params.ano || !req.params.mes || !req.params.dia) return res.sendStatus(400);
    
    var ano = req.params.ano;
    var mes = req.params.mes;
    var dia = req.params.dia;

    // Tentar criar o objeto, retornar um erro caso não consiga
    try { data = Data.buildData(ano, mes, dia); }
    catch (e) {
        if (e instanceof InvalidParameterError) return res.sendStatus(400);
        else return res.sendStatus(500);
    }

    // Associar data à requisição
    if (!req.params.interno) req.params.interno = {};
    req.params.interno.data = addMinutos(data, -data.getTimezoneOffset());

    // Continuar
    next();

}

export function mdAdicionarDataAtual(req : Request, res : Response, next : NextFunction) {

    // Verificar a existência de um campo 'dataAtual'
    if (req.body.dataAtual) {

        var data : Date;

        // Tentar criar o objeto, retornar um erro caso não consiga
        try { data = Data.buildDataFromString(req.body.dataAtual); }
        catch (e) {
            if (e instanceof InvalidParameterError) return res.sendStatus(400);
            else return res.sendStatus(500);
        }

        // Associar data à requisição
        if (!req.params.interno) req.params.interno = {};
        req.params.interno.dataAtual = data;

    }

    // Continuar
    next();

}