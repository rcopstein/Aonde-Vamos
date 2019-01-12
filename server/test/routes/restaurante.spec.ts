import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import 'mocha';

import server from '../../src/index';

chai.use(chaiHttp);

describe('Restaurante Route', () => {

  it ('deve retornar todos os restaurantes corretamente', () => {

    chai.request(server)
      .get("/restaurantes")
      .end((_, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');

        res.body.forEach( (x : any) => {
          expect(x, "Deve conter a propriedade '_id'").to.have.property("_id");
          expect(x, "Deve conter a propriedade '_nome'").to.have.property("_nome");
          expect(x, "Deve conter a propriedade '_endereco'").to.have.property("_endereco");
          expect(x, "Deve conter a propriedade '_descricao'").to.have.property("_descricao");
        });

      });

  });

  it ('deve retornar um restaurante especifico quando solicitado', () => {

    chai.request(server)
      .get("/restaurante/1")
      .end((_, res) => {
        expect(res.status, "Pedido de um restaurante válido não deve falhar").to.be.equal(200);
        expect(res.body, "Resultado esperado é um objeto").to.be.an('object');

        expect(res.body, "Deve conter a propriedade '_id'").to.have.property("_id");
        expect(res.body, "Deve conter a propriedade '_nome'").to.have.property("_nome");
        expect(res.body, "Deve conter a propriedade '_endereco'").to.have.property("_endereco");
        expect(res.body, "Deve conter a propriedade '_descricao'").to.have.property("_descricao");
      });

    chai.request(server)
      .get("/restaurante/peixe")
      .end((_, res) => {
        expect(res.status, "Pedido de um restaurante inválido deve retornar 404").to.be.equal(404);
        expect(res.body).to.be.empty;
      });

  });

});