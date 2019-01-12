import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import 'mocha';

import server from '../../src/index';
import { Restaurante } from '../../src/models/restaurante';

chai.use(chaiHttp);

describe('Restaurante Route', () => {

  it ('deve retornar todos os restaurantes corretamente', () => {

    chai.request(server)
      .get("/restaurantes")
      .end((_, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
      });

  });

  it ('deve retornar um restaurante especifico quando solicitado', () => {

    chai.request(server)
      .get("/restaurante/1")
      .end((_, res) => {
        expect(res.status, "Pedido de um restaurante válido não deve falhar").to.be.equal(200);
        expect(res.body, "Resultado esperado é um objeto").to.be.an('object');
      });

    chai.request(server)
      .get("/restaurante/peixe")
      .end((_, res) => {
        expect(res.status, "Pedido de um restaurante inválido deve retornar 404").to.be.equal(404);
        expect(res.body).to.be.empty;
      });

  });

});