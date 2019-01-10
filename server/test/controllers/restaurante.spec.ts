import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { RestauranteController } from '../../src/controllers/restaurante';

describe('Restaurante Controller', () => {

  var controller : RestauranteController;

  beforeEach( () => {

    controller = new RestauranteController();
    controller.addRestaurante(mock.restaurante1);
    controller.addRestaurante(mock.restaurante2);

  });

  it('deve devolver o restaurante pedido', () => {
    
    var result = controller.getRestaurante('1');

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.id, "Identificador do resultado é inesperado!").to.equal('1');

  });

  it ('deve devolver uma lista com o tamanho especificado ou menor', () => {

    for (var i = 0; i <= controller.count(); i++) {
        var result = controller.listRestaurantes(undefined, i);

        expect(result, "Resultado é nulo para n = " + i + "!").to.not.be.null;
        expect(result, "Resultado é indefinido para n = " + i + "!").to.not.be.undefined;
        expect(result.length, "Tamanho do vetor é maior que o esperado!").to.be.lte(i);
    }
  });

  it ('deve devolver uma lista vazia caso offset seja maior ou igual ao tamanho máximo', () => {

    var result = controller.listRestaurantes(controller.count());
    expect(result).to.be.empty;

  });

});