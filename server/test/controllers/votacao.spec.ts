import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { VotacaoController } from '../../src/controllers/votacao';
import { RestauranteController } from '../../src/controllers/restaurante';
import { VotoController } from '../../src/controllers/voto';
import { Votacao } from '../../src/models/votacao';
import { addHoras, addDias } from '../../src/util';

describe('Votacao Controller', () => {

  var controller : VotacaoController;
  var votoController : VotoController;
  var restauranteController : RestauranteController;

  beforeEach( () => {

    votoController = new VotoController();
    restauranteController = new RestauranteController();
    controller = new VotacaoController(votoController, restauranteController);

    restauranteController.addRestaurante(mock.restaurante1);
    restauranteController.addRestaurante(mock.restaurante2);

  });

  it ('deve calcular corretamente o vencedor de uma votação quando este tem mais votos', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    votoController.addVoto(data, addHoras(data, 1), mock.usuario1, mock.restaurante1);
    votoController.addVoto(data, addHoras(data, 2), mock.usuario2, mock.restaurante1);

    votacao = controller.getVotacaoPorDia(data);

    expect(votacao.data.getTime()).to.be.equal(data.getTime());
    expect(votacao.vencedor).to.be.equal(mock.restaurante1);
    expect(votacao.totalVotos.length).to.be.equal(1);

  });

  it ('deve calcular corretamente o vencedor de uma votação quando há um empate por número de votos', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    votoController.addVoto(data, addHoras(data, 3), mock.usuario1, mock.restaurante1);
    votoController.addVoto(data, addHoras(data, 2), mock.usuario2, mock.restaurante2);

    votacao = controller.getVotacaoPorDia(data);
    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(mock.restaurante2);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

  it ('deve calcular corretamente o vencedor de uma votação quando há um empate por número de votos e por data', () => {

    var data = new Date('2019-01-01');

    votoController.addVoto(data, addHoras(data, 3), mock.usuario1, mock.restaurante1);
    votoController.addVoto(data, addHoras(data, 3), mock.usuario2, mock.restaurante2);

    var votacao = controller.getVotacaoPorDia(data);
    let deveGanhar = mock.restaurante1.nome < mock.restaurante2.nome ? mock.restaurante1 : mock.restaurante2;

    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(deveGanhar);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

  it ('deve devolver a lista correta de candidatos de uma votação', () => {

    var data = new Date('2018-12-31');

    votoController.addVoto(data, data, mock.usuario1, mock.restaurante1);
    votoController.addVoto(data, data, mock.usuario2, mock.restaurante1);

    var candidatos = controller.listCandidatosPorDia(data);

    expect(candidatos, "Lista de candidatos tem o tamanho incorreto").to.have.length(2);
    expect(candidatos, "Lista de candidatos não contém o restaurante 1").to.contain(mock.restaurante1);
    expect(candidatos, "Lista de candidatos não contém o restaurante 2").to.contain(mock.restaurante2);

    data = addDias(data, 1);
    candidatos = controller.listCandidatosPorDia(data);

    expect(candidatos, "Lista de candidatos tem o tamanho incorreto na segunda vez").to.have.length(1);
    expect(candidatos, "Lista de candidatos contém o restaurante 1 na segunda vez").to.not.contain(mock.restaurante1);
    expect(candidatos, "Lista de candidatos não contém o restaurante 2 na segunda vez").to.contain(mock.restaurante2);

  });

});