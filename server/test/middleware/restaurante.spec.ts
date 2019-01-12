import { expect } from 'chai';
import 'mocha';

import * as nodeMocksHTTP from 'node-mocks-http';
import { mdValidarRestaurante } from '../../src/middleware/restaurante';

describe('Restaurante Middleware', () => {

    let request : any;
    let response : any;

    beforeEach ( () => {
        request = nodeMocksHTTP.createRequest();
        response = nodeMocksHTTP.createResponse();
    });

    it ('deve devolver um restaurante requisitado corretamente', () => {

        let restaurante = "1";
        request.body.restaurante = restaurante;

        mdValidarRestaurante(request, response, () => {

            expect(response.finished, "A resposta não ter terminado").to.be.false;

            expect(request.params).to.have.property("interno");
            expect(request.params.interno).to.have.property("restaurante");

            expect(request.params.interno.restaurante).to.have.property("_id");
            expect(request.params.interno.restaurante).to.have.property("_nome");
            expect(request.params.interno.restaurante).to.have.property("_endereco");
            expect(request.params.interno.restaurante).to.have.property("_descricao");

        });

    });

    it ('deve devolver um erro caso o restaurante não exista', () => {

        let restaurante = "-1";
        request.body.restaurante = restaurante;

        mdValidarRestaurante(request, response, () => {});
        expect(response.finished, "A resposta deve ter terminado").to.be.true;
        expect(request.params).not.to.have.property("interno");
        expect(response.statusCode).to.be.equal(404);

    });

    it ("deve devolver um erro caso o parâmetro 'restaurante' não tenha sido incluido", () => {

        mdValidarRestaurante(request, response, () => {});
        expect(response.finished, "A resposta deve ter terminado").to.be.true;
        expect(request.params).not.to.have.property("interno");
        expect(response.statusCode).to.be.equal(400);

    });

});