import { expect } from 'chai';
import 'mocha';

import { Data } from '../../src/models/data';
import { InvalidParameterError } from '../../src/errors/invalidParameterError';

describe('Data Model', () => {

  it('deve validar datas corretamente', () => {
    
    let data : Date;
    
    data = new Date();
    expect(Data.validarData(data), "Uma data válida deve ser validada corretamente!").to.be.true;

    data = new Date('peixe');
    expect(Data.validarData(data), "Uma data inválida deve ser invalidada corretamente!").to.be.false;

    data = new Date('2019-30-50');
    expect(Data.validarData(data), "Dias e meses que ultrapassam os limites não são permitidos, logo, a data deve ser invalidada").to.be.false;

    data = new Date('2019-a-50');
    expect(Data.validarData(data), "Uma data com caracteres inválidos deve ser invalidada!").to.be.false;

    data = new Date(2019, 30, 50);
    expect(Data.validarData(data), "Dias e meses que ultrapassam os limites, se criados com inteiros, devem ser validados corretamente").to.be.true;

  });

  it ('deve criar datas corretamente a partir de inteiros ou jogar uma exceção', () => {

    let data : Date;

    expect(() => data = Data.buildData(2019, 1, 1), "Criar uma data correta não deve jogar uma exceção").to.not.throw(InvalidParameterError);
    expect(Data.validarData(data), "A data criar deve ser válida").to.be.true;
    expect(data, "A data criada não pode ser null nem undefined").to.exist;

    expect(() => data = Data.buildData(2019, 0, 1), "Criar uma data correta com mês inválido deve jogar uma exceção").to.throw(InvalidParameterError);
    expect(() => data = Data.buildData(2019, 1, 50), "Criar uma data correta com dia inválido deve jogar uma exceção").to.throw(InvalidParameterError);

  });

  it ('deve criar datas corretamente a partir de string ou jogar uma exceção', () => {

    let data : Date;

    expect(() => data = Data.buildDataFromString('2019-01-01'), "Criar uma data correta não deve jogar uma exceção").to.not.throw(InvalidParameterError);
    expect(Data.validarData(data), "A data criar deve ser válida").to.be.true;
    expect(data, "A data criada não pode ser null nem undefined").to.exist;

    expect(() => data = Data.buildDataFromString('5000'), "Criar uma data correta a partir de tempo não deve jogar uma exceção").to.not.throw(InvalidParameterError);
    expect(Data.validarData(data), "A data criar deve ser válida").to.be.true;
    expect(data, "A data criada não pode ser null nem undefined").to.exist;

    expect(() => data = Data.buildDataFromString('2019-00-01'), "Criar uma data correta com mês inválido deve jogar uma exceção").to.throw(InvalidParameterError);
    expect(() => data = Data.buildDataFromString('2019-01-50'), "Criar uma data correta com dia inválido deve jogar uma exceção").to.throw(InvalidParameterError);
    expect(() => data = Data.buildDataFromString('peixe'), "Criar uma data incorreta deve jogar uma exceção").to.throw(InvalidParameterError);
    expect(() => data = Data.buildDataFromString('2019-a-01'), "Criar uma data com caracter inválido deve jogar uma exceção").to.throw(InvalidParameterError);

  });

});