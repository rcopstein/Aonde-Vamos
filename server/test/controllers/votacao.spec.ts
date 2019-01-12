import { expect } from 'chai';
import 'mocha';

import mock from '../mockData';
import { Votacao } from '../../src/models/votacao';
import { addHoras, addDias, mesmoDia, addMinutos } from '../../src/util';
import { VotacaoController } from '../../src/controllers/votacao';
import { RestauranteController } from '../../src/controllers/restaurante';
import { Restaurante } from '../../src/models/restaurante';
import { Status } from '../../src/models/status';
import { ActionForbiddenError } from '../../src/errors/actionForbiddenError';
import { InvalidParameterError } from '../../src/errors/invalidParameterError';

describe('Votacao Controller', () => {

  var controller : VotacaoController;
  var restauranteController : RestauranteController;

  beforeEach( () => {

    restauranteController = new RestauranteController();
    controller = new VotacaoController(restauranteController);

    mock.restaurantes.forEach( i => restauranteController.addRestaurante(i));

  });

  it ('deve retornar como nulo o vencedor de uma votação quando esta não tem votos', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    votacao = controller.getResultado(data);

    expect(votacao.data.getTime()).to.be.equal(data.getTime());
    expect(votacao.totalVotos.length).to.be.equal(0);
    expect(votacao.vencedor).to.be.null;

  });

  it ('deve calcular corretamente o vencedor de uma votação quando este tem mais votos', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    controller.addVoto(data, data, mock.usuarios[0], mock.restaurantes[1]);

    votacao = controller.getResultado(data);

    expect(votacao.data.getTime()).to.be.equal(data.getTime());
    expect(votacao.vencedor).to.be.equal(mock.restaurantes[1]);
    expect(votacao.totalVotos.length).to.be.equal(1);

    controller.addVoto(data, data, mock.usuarios[1], mock.restaurantes[0]);
    controller.addVoto(data, data, mock.usuarios[2], mock.restaurantes[0]);

    votacao = controller.getResultado(data);

    expect(votacao.data.getTime()).to.be.equal(data.getTime());
    expect(votacao.vencedor).to.be.equal(mock.restaurantes[0]);
    expect(votacao.totalVotos.length).to.be.equal(2);

  });

  it ('deve calcular o vencedor de uma votação quando há um empate por número de votos como aquele que alcançou a quantidade de votos primeiro', () => {

    var votacao : Votacao;
    var data = new Date('2019-01-01');

    controller.addVoto(data, addHoras(data, 3), mock.usuarios[0], mock.restaurantes[0]);
    controller.addVoto(data, addHoras(data, 2), mock.usuarios[1], mock.restaurantes[1]);

    votacao = controller.getResultado(data);
    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(mock.restaurantes[1]);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

  it ('deve calcular o vencedor de uma votação quando há um empate por número de votos e por data como aquele cujo nome vem primeiro alfabeticamente', () => {

    var data = new Date('2019-01-01');

    controller.addVoto(data, addHoras(data, 3), mock.usuarios[0], mock.restaurantes[0]);
    controller.addVoto(data, addHoras(data, 3), mock.usuarios[1], mock.restaurantes[1]);

    var votacao = controller.getResultado(data);
    let deveGanhar = mock.restaurantes[0].nome < mock.restaurantes[1].nome ? mock.restaurantes[0] : mock.restaurantes[1];

    expect(votacao.totalVotos.length).to.be.equal(2);
    expect(votacao.vencedor).to.be.equal(deveGanhar);
    expect(votacao.data.getTime()).to.be.equal(data.getTime());

  });

  it('deve devolver corretamente os votos do dia especificado', () => {
    
    var data = new Date();
    data.setHours(0, 0, 0, 0);

    controller.addVoto(data, data, mock.usuarios[0], mock.restaurantes[0]);
    controller.addVoto(addDias(data, 1), addDias(data, 1), mock.usuarios[1], mock.restaurantes[1]);
    controller.addVoto(addDias(data, -1), addDias(data, -1), mock.usuarios[1], mock.restaurantes[1]);

    var result = controller.listVotos(data);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

    result.forEach( item => {
        expect(mesmoDia(item.dataVotacao, data)).to.be.true;
        expect(item.ip, "Não deve conter votos de usuários que não votaram naquela data")
          .to.not.be.equal(mock.usuarios[1]);
        expect(item.restaurante, "Não deve conter votos para restaurantes que não foram votados naquela data")
          .to.not.be.equal(mock.restaurantes[1]);
    });

  });

  it ('deve devolver a lista correta de candidatos de uma votação ao longo de uma semana', () => {

    var data = new Date(2017, 0, 1); // É um domingo
    var candidatos : Array<Restaurante>;

    let total = mock.restaurantes.length;
    let todos = Array.from(mock.restaurantes);

    // Espera-se começar em um domingo
    expect(data.getDay()).to.be.equal(0);

    // Nos próximos dias, não pode conter o vencedor dos dias anteriores
    for (var i = 0; i < 7; i++) {

      // Lista os candidatos
      candidatos = controller.listCandidatos(data);

      // Verifica se todos estão lá
      expect(candidatos.length, "Deve conter" + (total - i) + " restaurantes").to.be.equal(total - i);
      todos.forEach( x => expect(candidatos, "Deve conter o restaurante " + x.nome).to.contain(x) );

      // Escolhe um vencedor aleatoriamente
      let indiceVencedor = Math.round(Math.random() * (total - i - 1));
      let vencedor = todos[indiceVencedor];

      // Remove ele do registro de todos
      todos = todos.filter( (_, indice) => indice != indiceVencedor );
      controller.addVoto(data, data, mock.usuarios[0], vencedor);
      
      // Vai para o próximo dia
      data = addDias(data, 1);

    }

    // Espera-se ter chegado novamente em um domingo
    expect(data.getDay()).to.be.equal(0);

    // Na semana seguinte, todos os restaurantes devem ser candidatos novamente
    candidatos = controller.listCandidatos(data);
    expect(candidatos.length, "Na semana seguinte todos os restaurantes devem ser candidatos").to.be.equal(mock.restaurantes.length);
    mock.restaurantes.forEach( x => expect(candidatos, "Deve conter o restaurante " + x.nome).to.contain(x) );

  });

  it ('deve devolver o status de uma votação corretamente', () => {

    var status : Status;
    var data = new Date();
    data.setHours(0, 0, 0, 0);

    // Antes de votar

    status = controller.getStatus(data, mock.usuarios[0]);
    expect(status.jaVotou, "O usuário não votou nesta data!").to.be.false;
    expect(mesmoDia(data, status.data), "A data retornada deve pertencer ao mesmo dia que a data parâmetro").to.be.true;

    var intervalo = controller.getIntervaloVotacao(data);
    expect(status.final.getTime(), "A data de final deve ser a mesma que a calculada pelo intervalo da votacao").to.be.equal(intervalo[1].getTime());
    expect(status.inicio.getTime(), "A data de inicio deve ser a mesma que a calculada pelo intervalo da votação").to.be.equal(intervalo[0].getTime());

    // Depois de votar

    controller.addVoto(data, data, mock.usuarios[0], mock.restaurantes[0]);
    status = controller.getStatus(data, mock.usuarios[0]);
    
    expect(status.jaVotou, "O usuário já votou nesta data!").to.be.true;

  });

  it ('deve devolver o resultado de uma votação corretamente', () => {

    var data = new Date();
    var resultado : Votacao;
    data.setHours(0, 0, 0, 0);

    let tabela = new Map<String, number>();
    for (var i = 0; i < mock.usuarios.length; i++) {
      var restaurante = mock.restaurantes[Math.round(Math.random() * (mock.restaurantes.length - 1))];
      tabela.set(restaurante.id, tabela.get(restaurante.id) ? tabela.get(restaurante.id) + 1 : 1);
      controller.addVoto(data, data, mock.usuarios[i], restaurante);
    }

    resultado = controller.getResultado(data);
    tabela.forEach( (val, key) => {
      let res = resultado.totalVotos.find( ([i, j]) => i == key && j == val);
      expect(res, "Resultado deve conter o registro de todos os restaurantes votados").to.exist;
    });
    expect(resultado.totalVotos.length).to.be.equal(tabela.size);


  });

  it ('deve devolver o voto do usuário especificado no dia especificado, se existir', () => {

    var data = new Date();
    data.setHours(0, 0, 0, 0);

    controller.addVoto(data, data, mock.usuarios[1], mock.restaurantes[1]);
    var result = controller.getVoto(data, mock.usuarios[1]);

    expect(result, "Resultado é nulo!").to.not.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;
    expect(result.ip, "Usuario não bate com o solicitado").to.be.equal(mock.usuarios[1]);
    expect(mesmoDia(result.dataVotacao, data), "Data não bate com a solicitada").to.be.true;

    var result = controller.getVoto(addDias(data, -1), mock.usuarios[1]);

    expect(result, "Resultado não é nulo!").to.be.null;
    expect(result, "Resultado é indefinido!").to.not.be.undefined;

  });

  it ('deve devolver o horário de votação corretamente', () => {

    let data = new Date();
    data.setHours(0, 0, 0, 0);
    let diaAnterior = addDias(data, -1);
    let intervalo = controller.getIntervaloVotacao(data);

    let inicio = intervalo[0];
    let final = intervalo[1];

    expect(inicio.getDate(), "O dia de início não bate").to.be.equal(diaAnterior.getDate());
    expect(inicio.getMonth(), "O mês de início não bate").to.be.equal(diaAnterior.getMonth());
    expect(inicio.getFullYear(), "O ano de início não bate").to.be.equal(diaAnterior.getFullYear());

    expect(final.getDate(), "O dia de final não bate").to.be.equal(data.getDate());
    expect(final.getMonth(), "O mês de final não bate").to.be.equal(data.getMonth());
    expect(final.getFullYear(), "O ano de final não bate").to.be.equal(data.getFullYear());

    expect(inicio.getUTCHours() - inicio.getTimezoneOffset() / 60, "Horário de início deve ser ao meio-dia")
      .to.be.equal(12);

    expect(inicio.getTime(), "O início não é antes do final").to.be.lessThan(final.getTime());
    expect(final.getTime(), "O final não é depois do início do dia").to.be.greaterThan(data.getTime());
    expect(inicio.getTime(), "O início não é antes do início do dia").to.be.lessThan(data.getTime());

  });

  it ('deve contabilizar um novo voto corretamente', () => {

    let data = new Date();
    data.setHours(0, 0, 0, 0);
    var count = controller.count();

    controller.addVoto(data, data, mock.usuarios[0], mock.restaurantes[0]);
    expect(controller.count(), "Contagem deve incluir o voto adicionado").to.be.equal(count + 1);

  });

  it ('deve jogar uma exceção quando o voto for feito fora do horário permitido', () => {

    var explain : string;
    let data = new Date();
    data.setHours(0, 0, 0, 0);
    let usuario = mock.usuarios[0];
    let restaurante = mock.restaurantes[0];
    let [inicio, fim] = controller.getIntervaloVotacao(data);

    explain = "Um voto feito no horário de fim da votação não deve ser permitido";
    expect(() => controller.addVoto(data, fim, usuario, restaurante), explain).to.throw(ActionForbiddenError);

    explain = "Um voto feito no dia seguinte ao da votação não deve ser permitido";
    expect(() => controller.addVoto(data, addDias(data, 1), usuario, restaurante), explain).to.throw(ActionForbiddenError);

    explain = "Um voto feito antes do horário de início não deve ser permitido";
    expect(() => controller.addVoto(data, addMinutos(inicio, -1), usuario, restaurante), explain).to.throw(ActionForbiddenError);

    explain = "Um voto feito durante o período de votação deve ser permitido";
    expect(() => controller.addVoto(data, data, usuario, restaurante), explain).not.to.throw(ActionForbiddenError);

  });

  it ('deve jogar uma exceção quando o voto for feito por um usuário que já votou', () => {

    var explain : string;
    let data = new Date();
    data.setHours(0, 0, 0, 0);
    let usuario1 = mock.usuarios[0];
    let usuario2 = mock.usuarios[1];
    let restaurante = mock.restaurantes[0];

    explain = "Um voto feito por um usuário que não votou deve ser permitido";
    expect(() => controller.addVoto(data, data, usuario1, restaurante), explain).not.to.throw(ActionForbiddenError);

    explain = "Um voto feito por um usuário que já votou não deve ser permitido";
    expect(() => controller.addVoto(data, data, usuario1, restaurante), explain).to.throw(ActionForbiddenError);

    explain = "Um voto feito por um usuário que não votou deve ser permitido"
    expect(() => controller.addVoto(data, data, usuario2, restaurante), explain).not.to.throw(ActionForbiddenError);

  });

  it ('deve jogar uma exceção quando o voto for feito para um restaurante que não é candidato', () => {

    var explain : string;
    let data = new Date();
    data.setHours(0, 0, 0, 0);
    let usuario = mock.usuarios[0];
    let restaurante1 = mock.restaurantes[0];
    let restaurante2 = mock.restaurantes[1];

    // Evita que quebremos a semana

    if (data.getDay() == 6) data = addDias(data, 1);

    // Votar em um restaurante

    explain = "Um voto feito para um restaurante candidato deve ser permitido";
    expect(() => controller.addVoto(data, data, usuario, restaurante1), explain).not.to.throw(InvalidParameterError);

    // 'restaurante1' será o vencedor na data
    // No dia seguinte, 'restaurante1' não poderá ser escolhido

    data = addDias(data, 1);

    explain = "Um voto feito para um restaurante não candidato não deve ser permitido";
    expect(() => controller.addVoto(data, data, usuario, restaurante1), explain).to.throw(InvalidParameterError);

    explain = "Um voto feito para um restaurante candidato deve ser permitido";
    expect(() => controller.addVoto(data, data, usuario, restaurante2), explain).not.to.throw(InvalidParameterError);

  })

});