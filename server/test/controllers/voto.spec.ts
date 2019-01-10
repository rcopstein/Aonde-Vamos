import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { mesmoDia, addDias } from '../../src/util';
import { VotoController } from '../../src/controllers/voto';

describe('Voto Controller', () => {

  var controller : VotoController;

  beforeEach( () => {

    controller = new VotoController();

  });

  it('deve devolver os votos do dia especificado', () => {
    
    var data = new Date('2019-01-09');

    controller.addVoto(data, data, mock.usuario1, mock.restaurante1);
    controller.addVoto(addDias(data, 1), data, mock.usuario2, mock.restaurante2);

    var result = controller.listVotosPorDia(data);

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