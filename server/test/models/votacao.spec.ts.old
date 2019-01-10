import { expect } from 'chai';
import 'mocha';

import { Voto } from '../../src/models/Voto';
import { Votacao } from '../../src/models/Votacao';
import { Usuario } from '../../src/models/Usuario';
import { Restaurante } from '../../src/models/Restaurante';

let usr1 = new Usuario("João da Silva", "12345");
let usr2 = new Usuario("Jonatas Silva", "23456");
let usr3 = new Usuario("Janetes Silva", "34567");

let rst1 = new Restaurante("1", "Palatus", "PUCRS", "Aquele que tem suco depois das 13:30");
let rst2 = new Restaurante("2", "Panorama", "PUCRS", "Aquele que a gente só vai de vez em quando porque é caro");
let rst3 = new Restaurante("3", "Trinta e Dois", "PUCRS", "Aquele que a gente vai quando enjoa do Palatus");

describe('Votação', () => {

  it('deve retornar \'null\' na falta de votos', () => {
    
    let votacao = new Votacao(new Date());
    let vencedor = votacao.vencedor();
    expect(vencedor, "O vencedor não é null").to.be.null;

  });

  it ('deve contabilizar os votos corretos corretamente', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    expect(votacao.votos, "Não começou vazia").to.have.length(0);

    votacao.addVoto(new Voto(date, usr1, rst1));
    expect(votacao.votos, "Não contabilizou o primeiro voto corretamente").to.have.length(1);

    votacao.addVoto(new Voto(date, usr2, rst2));
    expect(votacao.votos, "Não contabilizou o segundo voto corretamente").to.have.length(2);

  });

  it ('não deve contabilizar votos incorretos', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    expect(votacao.votos, "Não começo vazia").to.have.length(0);

    votacao.addVoto(new Voto(date, usr1, rst1));
    expect(votacao.votos, "Não contabilizou o primeiro voto corretamente").to.have.length(1);

    votacao.addVoto(new Voto(date, usr1, rst2));
    expect(votacao.votos, "Contabilizou o segundo voto, o que é incorreto").to.have.length(1);

  });

  it ('não deve permitir mais de um voto por usuário', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    var result = votacao.addVoto(new Voto(date, usr1, rst1));
    expect(result, "Não permitiu um voto correto").to.be.true;

    result = votacao.addVoto(new Voto(date, usr1, rst1));
    expect(result, "Permitiu mais de um voto do mesmo usuário").to.be.false;

  });

  it ('não deve permitir votos em datas que não sejam no mesmo dia', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    var result = votacao.addVoto(new Voto(date, usr1, rst1));
    expect(result, "Não permitiu um voto correto").to.be.true;

    result = votacao.addVoto(new Voto(new Date(date.getDate() + 1), usr2, rst2));
    expect(result, "Permitiu um voto incorreto").to.be.false;

  });

  it('deve retornar como vencedor o restaurante mais votado', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    votacao.addVoto(new Voto(date, usr1, rst3));
    votacao.addVoto(new Voto(date, usr2, rst3));
    votacao.addVoto(new Voto(date, usr3, rst2));

    let vencedor = votacao.vencedor();
    expect(vencedor, "Não encontrou o vencedor correto").to.equal(rst3);

  });

  it ('em caso de empate por número de votos, deve retornar o restaurante que atingiu a quantidade de votos primeiro', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    votacao.addVoto(new Voto(new Date(date.getTime() + 10 * 60000), usr1, rst1));
    votacao.addVoto(new Voto(date, usr2, rst2));
    votacao.addVoto(new Voto(new Date(date.getTime() + 20 * 60000), usr3, rst3));

    expect(votacao.votos, "Nem todos os votos foram contabilizados!").to.have.length(3);

    let vencedor = votacao.vencedor();
    expect(vencedor, "Não encontrou o vencedor correto").to.equal(rst2);

  });

  it ('em caso de empate por número de votos e por data, deve retornar aquele cujo nome vem primero alfabeticamente', () => {

    let date = new Date();
    let votacao = new Votacao(date);

    votacao.addVoto(new Voto(date, usr2, rst2));
    votacao.addVoto(new Voto(date, usr1, rst1));
    votacao.addVoto(new Voto(date, usr3, rst3));

    let vencedor = votacao.vencedor();
    expect(vencedor, "Não encontrou o vencedor correto").to.equal(rst1);

  });

});