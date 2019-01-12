import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import 'mocha';

import server from '../../src/index';
import { Response } from 'superagent';
import VotacaoController from '../../src/controllers/votacao';

chai.use(chaiHttp);

function buildURL(base : string, data : Date, ...vals : Array<string>) : string {

    let url = "/" + base + "/";
    if (data) url = url + data.getFullYear() + "/" + (data.getMonth() + 1) + "/" + data.getDate() + "/";
    vals.forEach( x => url = url + x + '/' );
    return url;

}

describe('Votacao Route', () => {

    beforeEach( () => {
        VotacaoController.clear();
    });

    describe('/votacao/:ano/:mes/:dia/', () => {

        it ('deve retornar o status de qualquer data com sucesso', async () => {

            let data = new Date();
            let url = buildURL("votacao", data);
            let res = await chai.request(server).get(url);

            expect(res.status, "Deve ter status 200").to.be.equal(200);
            expect(res.body, "Deve ser um objeto").to.be.an('object');

            expect(res.body, "Deve ter a propriedade '_jaVotou'").to.have.property("_jaVotou");
            expect(res.body, "Deve ter a propriedade '_inicio'").to.have.property("_inicio");
            expect(res.body, "Deve ter a propriedade '_final'").to.have.property("_final");
            expect(res.body, "Deve ter a propriedade '_data'").to.have.property("_data");
    
        });

        it ('deve contabilizar um voto válido corretamente', async () => {

            let data = new Date();
            data.setHours(0, 0, 0, 0);
            let url = buildURL("votacao", data);
            let voto = { "restaurante" : "1", "dataAtual" : data.toString() };

            let res = await chai.request(server).post(url).send(voto);

            expect(res.status, "Deve ter status 200").to.be.equal(200);
            expect(res.body, "Não deve ter corpo").to.be.empty;

        })

    });

    describe('/votacao/:ano/:mes/:dia/votos', () => {

        it ('deve retornar a lista de votos de qualquer data com sucesso e com a quantidade correta de votos', async () => {

            var res : Response;
            var count : number;
            let data = new Date();
            let url = buildURL("votacao", data, "votos");

            // Faz uma requisição para todos os votos
            res = await chai.request(server).get(url);

            expect(res.status, "A primeira requisição deve ser bem-sucedida").to.be.equal(200);
            expect(res.body, "O corpo da primeira requisição deve ser um array").to.be.an('array');
            count = res.body.length;

            // Faz um voto
            data.setHours(0, 0, 0, 0);
            var url2 = buildURL("votacao", data);
            res = await chai.request(server).post(url2).send({ "restaurante" : "1", "dataAtual" : data.toString() });

            // Faz uma segunda requisição para todos os votos
            res = await chai.request(server).get(url);

            expect(res.status, "A segunda requisição deve ser bem-sucedida").to.be.equal(200);
            expect(res.body, "O corpo da segunda requisição deve ser um array").to.be.an('array');
            expect(res.body.length, "O array retornado deve ter count + 1 elementos").to.be.equal(count + 1);

            res.body.forEach( (x : any) => {
                expect(x, "Deve conter a propriedade '_dataVoto'").to.have.property("_dataVoto");
                expect(x, "Deve conter a propriedade '_dataVotacao'").to.have.property("_dataVotacao");
                expect(x, "Deve conter a propriedade '_ip'").to.have.property("_ip").that.is.an.ip;
                expect(x, "Deve conter a propriedade '_restaurante'").to.have.property("_restaurante").that.has.property("_id");
                expect(x, "Deve conter a propriedade '_restaurante'").to.have.property("_restaurante").has.property("_nome");
                expect(x, "Deve conter a propriedade '_restaurante'").to.have.property("_restaurante").has.property("_endereco");
                expect(x, "Deve conter a propriedade '_restaurante'").to.have.property("_restaurante").has.property("_descricao");
            });
    
        });

    });

    describe('/votacao/:ano/:mes/:dia/resultado', () => {

        it ('deve retornar o resultado de uma votação corretamente', async () => {

            var res : Response;
            let data = new Date();
            let url = buildURL("votacao", data, "resultado");

            // Faz uma requisição para o resultado de uma votação que ainda não ocorreu
            res = await chai.request(server).get(url);

            expect(res.status, "A primeira requisição deve ser bem-sucedida").to.be.equal(200);
            expect(res.body, "O corpo da primeira requisição deve ser um objeto").to.be.an('object');
            expect(res.body).to.have.property("_totalVotos");
            expect(res.body).to.have.property("_vencedor");
            expect(res.body).to.have.property("_data");

        });

    });

    describe('/votacao/:ano/:mes/:dia/candidatos', () => {

        it ('deve retornar os candidatos de uma votação corretamente', async () => {

            var res : Response;
            let data = new Date();
            let url = buildURL("votacao", data, "candidatos");

            // Faz uma requisição para o resultado de uma votação que ainda não ocorreu
            res = await chai.request(server).get(url);

            expect(res.status, "A requisição deve ser bem-sucedida").to.be.equal(200);
            expect(res.body, "O corpo da requisição deve ser um array").to.be.an('array');

            res.body.forEach( (x : any) => {
                expect(x, "Deve conter a propriedade '_id'").to.have.property("_id");
                expect(x, "Deve conter a propriedade '_nome'").to.have.property("_nome");
                expect(x, "Deve conter a propriedade '_endereco'").to.have.property("_endereco");
                expect(x, "Deve conter a propriedade '_descricao'").to.have.property("_descricao");
            });

        });

    });

});