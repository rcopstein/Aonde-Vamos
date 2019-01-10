import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { VotacaoController } from '../../src/controllers/votacao';
import { VotoController } from '../../src/controllers/voto';
import { addHoras } from '../../src/util';
import { Votacao } from '../../src/models/votacao';

describe('Votacao Controller', () => {

  var controller : VotacaoController;
  var votoController : VotoController;

  beforeEach( () => {

    votoController = new VotoController();
    controller = new VotacaoController(votoController);

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

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    votoController.addVoto(data, addHoras(data, 3), mock.usuario1, mock.restaurante1);
    votoController.addVoto(data, addHoras(data, 3), mock.usuario2, mock.restaurante2);

    votacao = controller.getVotacaoPorDia(data);
    let deveGanhar = mock.restaurante1.nome < mock.restaurante2.nome ? mock.restaurante1 : mock.restaurante2;

    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(deveGanhar);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

});