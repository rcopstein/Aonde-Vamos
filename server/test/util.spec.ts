import { expect } from 'chai';
import 'mocha';

import * as util from "../src/util";

describe('Util', () => {

  it('a semana de uma data deve ser o tempo (em milissegundos) do último domingo anterior à data', () => {
    
    var data = new Date(2019, 0, 9);
    var ultimoDomingo = new Date(2019, 0, 6);
    expect(util.calculaSemana(data)).to.be.equal(ultimoDomingo.getTime());

  });

  it ('deve retornar corretamente se duas datas pertencem à mesma semana', () => {

    var data1 = new Date(2018, 11, 31);
    var data2 = new Date(2019,  0,  1);

    expect(util.mesmaSemana(data1, data2), "Não funcionou na virada do ano").to.be.true;

    var data3 = new Date(2019,  0,  9);

    expect(util.mesmaSemana(data1, data3), "Não funcionou na virada do ano com mais distância").to.be.false;

    var data4 = new Date(2019,  0, 11);

    expect(util.mesmaSemana(data2, data4), "Não funcionou na primeira/segunda semana de janeiro").to.be.false;
    expect(util.mesmaSemana(data3, data4), "Não funcionou na segunda semana de janeiro").to.be.true;

  });

  it ('deve retornar corretamente se duas datas representam o mesmo dia', () => {

    var data1 = new Date(2018,  0,  1);
    var data2 = new Date(2019,  0,  1);

    expect(util.mesmoDia(data1, data2)).to.be.false;

    var data3 = new Date(2019,  0,  1);

    expect(util.mesmoDia(data2, data3)).to.be.true;

    var data4 = new Date(2019,  1,  1);
    var data5 = new Date(2019,  0,  2);

    expect(util.mesmoDia(data2, data4)).to.be.false;
    expect(util.mesmoDia(data2, data5)).to.be.false;

    var data6 = new Date(2019,  0,  1,  4, 12, 34);

    expect(util.mesmoDia(data2, data6)).to.be.true;

  });

});