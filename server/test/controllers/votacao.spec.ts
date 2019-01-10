import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { Votacao } from '../../src/models/votacao';
import { addHoras, addDias, mesmoDia } from '../../src/util';
import { VotacaoController } from '../../src/controllers/votacao';
import { RestauranteController } from '../../src/controllers/restaurante';

describe('Votacao Controller', () => {

  var controller : VotacaoController;
  var restauranteController : RestauranteController;

  beforeEach( () => {

    restauranteController = new RestauranteController();
    controller = new VotacaoController(restauranteController);

    restauranteController.addRestaurante(mock.restaurante1);
    restauranteController.addRestaurante(mock.restaurante2);

  });

  it ('deve calcular corretamente o vencedor de uma votação quando este tem mais votos', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    controller.addVoto(data, addHoras(data, 1), mock.usuario1, mock.restaurante1);
    controller.addVoto(data, addHoras(data, 2), mock.usuario2, mock.restaurante1);

    votacao = controller.getResultado(data);

    expect(votacao.data.getTime()).to.be.equal(data.getTime());
    expect(votacao.vencedor).to.be.equal(mock.restaurante1);
    expect(votacao.totalVotos.length).to.be.equal(1);

  });

  it ('deve calcular corretamente o vencedor de uma votação quando há um empate por número de votos', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    controller.addVoto(data, addHoras(data, 3), mock.usuario1, mock.restaurante1);
    controller.addVoto(data, addHoras(data, 2), mock.usuario2, mock.restaurante2);

    votacao = controller.getResultado(data);
    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(mock.restaurante2);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

  it ('deve calcular corretamente o vencedor de uma votação quando há um empate por número de votos e por data', () => {

    var data = new Date('2019-01-01');

    controller.addVoto(data, addHoras(data, 3), mock.usuario1, mock.restaurante1);
    controller.addVoto(data, addHoras(data, 3), mock.usuario2, mock.restaurante2);

    var votacao = controller.getResultado(data);
    let deveGanhar = mock.restaurante1.nome < mock.restaurante2.nome ? mock.restaurante1 : mock.restaurante2;

    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(deveGanhar);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

  it ('deve devolver a lista correta de candidatos de uma votação', () => {

    var data = new Date('2018-12-31');

    controller.addVoto(data, data, mock.usuario1, mock.restaurante1);
    controller.addVoto(data, data, mock.usuario2, mock.restaurante1);

    var candidatos = controller.listCandidatos(data);

    expect(candidatos, "Lista de candidatos tem o tamanho incorreto").to.have.length(2);
    expect(candidatos, "Lista de candidatos não contém o restaurante 1").to.contain(mock.restaurante1);
    expect(candidatos, "Lista de candidatos não contém o restaurante 2").to.contain(mock.restaurante2);

    data = addDias(data, 1);
    candidatos = controller.listCandidatos(data);

    expect(candidatos, "Lista de candidatos tem o tamanho incorreto na segunda vez").to.have.length(1);
    expect(candidatos, "Lista de candidatos contém o restaurante 1 na segunda vez").to.not.contain(mock.restaurante1);
    expect(candidatos, "Lista de candidatos não contém o restaurante 2 na segunda vez").to.contain(mock.restaurante2);

  });

  it('deve devolver os votos do dia especificado', () => {
    
    var data = new Date('2019-01-09');

    controller.addVoto(data, data, mock.usuario1, mock.restaurante1);
    controller.addVoto(addDias(data, 1), data, mock.usuario2, mock.restaurante2);

    var result = controller.listVotos(data);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

    result.forEach( item => {
        expect(mesmoDia(item.dataVotacao, data)).to.be.true;
        expect(item.usuario).to.not.be.equal(mock.usuario2);
        expect(item.restaurante).to.not.be.equal(mock.restaurante2);
    });

  });

  it ('deve devolver o voto do usuário especificado no dia especificado, se existir', () => {

    var data = new Date(2019, 0, 9);

    controller.addVoto(data, data, mock.usuario1, mock.restaurante1);
    var result = controller.getVoto(data, mock.usuario1);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.usuario, "Usuario não bate com o solicitado").to.be.equal(mock.usuario1);
    expect(mesmoDia(result.dataVotacao, data), "Data não bate com a solicitada").to.be.true;

    var result = controller.getVoto(addDias(data, -1), mock.usuario1);

    expect(result, "Resultado não é nulo!").to.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

  });

  it ('deve devolver o horário de votação corretamente', () => {

    let data = new Date('2019-01-02');
    let intervalo = controller.getIntervaloVotacao(data);

    expect(intervalo[0].getDate(), "O dia de início não bate").to.be.equal(1);
    expect(intervalo[0].getMonth(), "O mês de início não bate").to.be.equal(0);
    expect(intervalo[0].getFullYear(), "O ano de início não bate").to.be.equal(2019);

    expect(intervalo[1].getDate(), "O dia de final não bate").to.be.equal(2);
    expect(intervalo[1].getMonth(), "O mês de final não bate").to.be.equal(0);
    expect(intervalo[1].getFullYear(), "O ano de final não bate").to.be.equal(2019);

    expect(intervalo[0].getTime(), "O início não é antes do final").to.be.lessThan(intervalo[1].getTime());
    expect(intervalo[1].getTime(), "O final não é depos do início do dia").to.be.greaterThan(data.getTime());
    expect(intervalo[0].getTime(), "O início não é antes do início do dia").to.be.lessThan(data.getTime());

  });

});