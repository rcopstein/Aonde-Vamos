import { expect } from 'chai';
import 'mocha';

import * as nodeMocksHTTP from 'node-mocks-http';
import { mdValidarData, mdAdicionarDataAtual } from '../../src/middleware/data';

describe('Data Middleware', () => {

    let request : any;
    let response : any;

    beforeEach ( () => {
        request = nodeMocksHTTP.createRequest();
        response = nodeMocksHTTP.createResponse();
    });

    it ('deve validar uma data passada corretamente', () => {

        let data = new Date();
        request.params.ano = data.getFullYear();
        request.params.mes = data.getMonth() + 1;
        request.params.dia = data.getDate();

        mdValidarData(request, response, () => {

            expect(response.finished, "A resposta não ter terminado").to.be.false;

        });

    });

    it ('deve invalidar uma data passada incorretamente', () => {

        request.params.ano = 2019;
        request.params.mes = 1;
        request.params.dia = 32;

        mdValidarData(request, response, () => {});
        expect(response.statusCode, "Um dia inválido deve produzir um erro de parâmetro inválido").to.be.equal(400);
        expect(response.finished, "A resposta deve ter terminado!").to.be.true;

        request.params.ano = 2019;
        request.params.mes = 0;
        request.params.dia = 1;

        mdValidarData(request, response, () => {});
        expect(response.statusCode, "Um mês inválido deve produzir um erro de parâmetro inválido").to.be.equal(400);
        expect(response.finished, "A resposta deve ter terminado!").to.be.true;

        request.params.ano = "peixe";
        request.params.mes = 1;
        request.params.dia = 32;

        mdValidarData(request, response, () => {});
        expect(response.statusCode, "Um ano inválido deve produzir um erro de parâmetro inválido").to.be.equal(400);
        expect(response.finished, "A resposta deve ter terminado!").to.be.true;

        request.params = {};

        mdValidarData(request, response, () => {});
        expect(response.statusCode, "A falta de um parâmetro da data deve produzir um erro de parâmetro inválido").to.be.equal(400);
        expect(response.finished, "A resposta deve ter terminado!").to.be.true;

    });

    it ("deve adicionar o parâmetro de 'dataAtual' corretamente", () => {

        request.body.dataAtual = "2019-01-31";

        mdAdicionarDataAtual(request, response, () => {

            expect(request.params).to.have.property('interno')
            expect(request.params.interno).to.have.property('dataAtual');

        });

    });

    it ("deve devolver um erro ao tentar adicionar um parâmetro inválido de 'dataAtual'", () => {

        request.body.dataAtual = "2019-00-31";

        mdAdicionarDataAtual(request, response, () => {});
        expect(request.params).not.to.have.property('interno')
        expect(response.statusCode).to.be.equal(400);
        expect(response.finished).to.be.true;

        request.body.dataAtual = "2019-01-peixe";

        mdAdicionarDataAtual(request, response, () => {});
        expect(request.params).not.to.have.property('interno')
        expect(response.statusCode).to.be.equal(400);
        expect(response.finished).to.be.true;

    });

    it ("deve seguir a execução caso o parâmetro 'dataAtual' não seja passado", () => {

        mdAdicionarDataAtual(request, response, () => {

            expect(request.params).not.to.have.property('interno')
            expect(response.finished).to.be.false;

        });

    });

});