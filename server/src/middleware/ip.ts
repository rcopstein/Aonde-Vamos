import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

export function mdValidaIP(req : Request, res : Response, next : NextFunction) {

    // Verifica se o ip foi encontrado
    const ip = requestIp.getClientIp(req);
    if (!ip) return res.status(403).send("Não foi possível determinar o IP da requisição!");

    // Associar IP à requisição
    if (!req.params.interno) req.params.interno = {};
    req.params.interno.ip = ip;

    // Continue
    next(); 

}