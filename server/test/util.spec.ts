import { expect } from 'chai';
import 'mocha';

import * as util from "../src/util";

describe('Util', () => {

	it ('deve retornar corretamente se duas datas representam o mesmo dia', () => {

		var data1 = new Date(2018,  0,  1);
		var data2 = new Date(2019,  0,  1);
		var data3 = new Date(2019,  0,  1);
		var data4 = new Date(2019,  1,  1);
		var data5 = new Date(2019,  0,  2);
		var data6 = new Date(2019,  0,  1,  4, 12, 34);

		// Apenas o ano diferente ()

		expect(util.mesmoDia(data1, data2), "O ano deve ser igual!").to.be.false;

		// Apenas o mês diferente

		expect(util.mesmoDia(data2, data4), "O mês deve ser igual!").to.be.false;

		// Apenas o dia diferente

		expect(util.mesmoDia(data2, data5), "O dia deve ser igual!").to.be.false;

		// Apenas o horário diferente

		expect(util.mesmoDia(data2, data6), "O horário não deve importar!").to.be.true;

		// Nenhum parâmetro diferente

		expect(util.mesmoDia(data2, data3), "Os dois objetos foram criados igualmente").to.be.true;
		expect(util.mesmoDia(data2, data2), "Uma data deve ser no mesmo dia que ela mesma!").to.be.true;

	});

	it ('deve adicionar minutos corretamente à uma data', () => {

		let data = new Date();

		for (var i = 0; i < 100; i++) {
			let min = Math.round(Math.random() * 1000);
			let outro = util.addMinutos(data, min);
			expect(outro.getTime() - data.getTime()).to.be.equal(min * 60000);
		}

	});

	it ('deve adicionar horas corretamente à uma data', () => {

		let data = new Date();

		for (var i = 0; i < 100; i++) {
			let horas = Math.round(Math.random() * 1000);
			let outro = util.addHoras(data, horas);
			expect(outro.getTime()).to.be.equal(util.addMinutos(data, horas * 60).getTime());
		}

	});

	it ('deve adicionar dias corretamente à uma data', () => {

		let data = new Date();

		for (var i = 0; i < 100; i++) {
			let dias = Math.round(Math.random() * 1000);
			let outro = util.addDias(data, dias);
			expect(outro.getTime()).to.be.equal(util.addHoras(data, dias * 24).getTime());
		}

	});

});