import { expect } from 'chai';
import 'mocha';

import { mesmoDia } from '../../src/util';
import { VotoController } from '../../src/controllers/voto';

describe('Voto Controller', () => {

  it('deve devolver os votos do dia especificado', () => {
    
    var data = new Date(2019, 0, 9);
    var controller = new VotoController();

    controller.addVoto(data, "194382000-2", "1");
    controller.addVoto(new Date(data.getTime() + 1 * 24 * 60 * 60000), "847928374-5", "2");

    var result = controller.listVotosPorDia(data);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

    result.forEach( item => {
        expect(mesmoDia(item.data, data)).to.be.true;
    });

  });

  it ('deve devolver o voto do usuário especificado no dia especificado, se existir', () => {

    var data = new Date(2019, 0, 9);
    var controller = new VotoController();

    controller.addVoto(data, "194382000-2", "1");
    var result = controller.getVoto(data, "194382000-2");

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.usuario.matricula, "Usuario não bate com o solicitado").to.be.equal("194382000-2");
    expect(mesmoDia(result.data, data), "Data não bate com a solicitada").to.be.true;

    var result = controller.getVoto(new Date(data.getTime() - 1 * 24 * 60 * 60000), "194382000-2");

    expect(result, "Resultado não é nulo!").to.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

  });

});