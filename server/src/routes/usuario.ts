import { Response, Request, NextFunction } from 'express';
import UsuarioController from '../controllers/usuario';

export function mdValidarUsuario(req : Request, res : Response, next : NextFunction) {

    // Encontrar a matricula do usuário na requisição
    var matricula = req.body.matricula;
    if (!matricula) return res.status(400).send("Parâmetro 'matricula' está faltando!");

    // Procurar usuário equivalente
    let usuario = UsuarioController.getUsuario(matricula);
    if (!usuario) return res.status(404).send("Usuário com matrícula '" + matricula + "' não encontrado!");

    // Atribuir usuário à requisição
    if (!req.params.interno) req.params.interno = {};
    req.params.interno.usuario = usuario;

    // Continuar
    next();

}