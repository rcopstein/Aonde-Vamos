import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { mesmoDia, addDias } from '../../src/util';
import { VotoController } from '../../src/controllers/voto';

describe('Voto Controller', () => {

  it('deve devolver os votos do dia especificado', () => {
    
    var data = new Date(2019, 0, 9);
    var controller = new VotoController();

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
    var controller = new VotoController();

    controller.addVoto(data, data, mock.usuario1, mock.restaurante1);
    var result = controller.getVoto(data, mock.usuario1);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.usuario, "Usuario não bate com o solicitado").to.be.equal(mock.usuario1);
    expect(mesmoDia(result.dataVotacao, data), "Data não bate com a solicitada").to.be.true;

    var result = controller.getVoto(new Date(data.getTime() - 1 * 24 * 60 * 60000), mock.usuario1);

    expect(result, "Resultado não é nulo!").to.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

  });

});