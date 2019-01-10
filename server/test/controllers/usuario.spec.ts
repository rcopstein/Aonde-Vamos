import { expect } from 'chai';
import 'mocha';

import { UsuarioController } from '../../src/controllers/usuario';

describe('Usuario Controller', () => {

  it('deve devolver o usuário pedido', () => {
    
    var controller = new UsuarioController();
    var result = controller.getUsuario('194382000-2');

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.matricula, "Identificador do resultado é inesperado!").to.equal('194382000-2');

  });

});