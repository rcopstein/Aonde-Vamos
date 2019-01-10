import { expect } from 'chai';
import 'mocha';

import { VotacaoController } from '../../src/controllers/votacao';
import { calculaSemana } from '../../src/util';

describe('Votacao Controller', () => {

  it('deve devolver a votacao do dia especificado', () => {
    
    var data = new Date(2019, 0, 9);
    var controller = new VotacaoController();
    var result = controller.getVotacaoPorDia(data);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.data.getTime(), "Data do resultado é inesperado!").to.equal(data.getTime());

  });

  it ('deve devlover as votacoes da semana especificada', () => {

    var data = new Date(2019, 0, 9);
    var semana = calculaSemana(data);

    var controller = new VotacaoController();
    var result = controller.listVotacoesPorSemana(semana);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    result.forEach( item => expect(calculaSemana(item.data)).to.be.equal(semana));

  });

  it ('deve devolver uma lista com o tamanho especificado ou menor', () => {

    var controller = new VotacaoController();

    for (var i = 0; i <= controller.count(); i++) {
        var result = controller.listVotacoes(undefined, i);

        expect(result, "Resultado é nulo para n = " + i + "!").to.not.be.null;
        expect(result, "Resultado é indefinido para n = " + i + "!").to.not.be.undefined;
        expect(result.length, "Tamanho do vetor é maior que o esperado!").to.be.lte(i);
    }
  });

  it ('deve devolver uma lista vazia caso offset seja maior ou igual ao tamanho máximo', () => {

    var controller = new VotacaoController();
    var result = controller.listVotacoes(controller.count());
    expect(result).to.be.empty;

  });

  it ('deve adicionar um novo item na lista', () => {

    var controller = new VotacaoController();
    var oldCount = controller.count();
    controller.addVotacao(new Date());

    expect(controller.count()).to.be.equal(oldCount + 1);

  });

});