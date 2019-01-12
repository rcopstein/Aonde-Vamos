import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { RestauranteController } from '../../src/controllers/restaurante';
import { Restaurante } from '../../src/models/restaurante';

describe('Restaurante Controller', () => {

  var controller : RestauranteController;

  beforeEach( () => {

    controller = new RestauranteController();
    mock.restaurantes.forEach( i => controller.addRestaurante(i) );

  });

  it('deve devolver o restaurante pedido', () => {
    
    mock.restaurantes.forEach( restaurante => {

      var result = controller.getRestaurante(restaurante.id);

      expect(result, "Resultado é nulo!").to.not.be.null;
      expect(result, "Resultado é indefinido!").to.not.be.undefined;
      expect(result.id, "Identificador do resultado é inesperado!").to.equal(restaurante.id);

    });

  });

  it ('deve devolver uma lista com o tamanho correto', () => {

    var result = controller.listRestaurantes();
    expect(result.length).to.be.equal(mock.restaurantes.length);

    for (var i = 0; i <= controller.count() + 1; i++) {
      for (var j = 0; j <= controller.count() + 1; j++) {

        var tam = Math.min(j, Math.max(controller.count() - i, 0));
        var result = controller.listRestaurantes(i, j);
        expect(result, "Resultado é nulo para n = " + i + "!").to.not.be.null;
        expect(result, "Resultado é indefinido para n = " + i + "!").to.not.be.undefined;
        expect(result.length, "Tamanho do vetor é diferente do esperado!").to.be.equal(tam);

      }
    }
  });

  it ('deve contabilizar um novo restaurante corretamente', () => {

    var count = controller.count();
    controller.addRestaurante(new Restaurante("", "", "", ""));
    expect(controller.count()).to.be.equal(count + 1);

  });

  it ('deve retornar o número correto de restaurantes cadastrados', () => {

    expect(controller.count()).to.be.equal(mock.restaurantes.length);

  });

});