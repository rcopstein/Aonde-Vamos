import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante';
import { DataService } from 'src/app/services/data/data.service';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VotesDisplayComponent } from '../votes-display/votes-display.component';
import { Status } from 'src/app/model/status';
import { ResultDisplayComponent } from '../result-display/result-display.component';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.sass']
})
export class VotingComponent implements OnInit {

  // Variaveis

  data : Date;
  titulo : string = "";
  habilitado : boolean = true;

  selecionado : string;
  candidatos : Array<Restaurante>;

  mostrarVotacao : boolean = false;
  mostrarResultado : boolean = false;
  mostrarErroEnvio : boolean = false;
  mostrarErroGeral : boolean = false;

  @ViewChild(VotesDisplayComponent) votesDisplay : VotesDisplayComponent;
  @ViewChild(ResultDisplayComponent) resultDisplay : ResultDisplayComponent;

  // Metodos

  async onSubmit() {

    this.habilitado = false;
    this.mostrarErroEnvio = false;
    let result = await this.votacaoService.votar(this.data, this.selecionado);

    if (result && !(result instanceof HttpErrorResponse)) {

      this.mostrarVotacao = false;
      this.carregaVotos();
      return;

    }

    this.mostrarErroEnvio = true;
    this.habilitado = true;

  }

  onRetry() {

    this.carregar();

  }

  async carregaStatus(continuar : boolean = true, data? : Date) : Promise<[Date, Status]> {

    return new Promise<[Date, Status]>( async (resolve, reject) => {

      // Se a data não for especificada, carrega a data de hoje
      if (!data) data = this.dataService.hoje();

      // Tenta carregar o status
      let status = await this.votacaoService.getStatus(data);
      if (status instanceof HttpErrorResponse) return resolve(null);

      // Verifica se a votação ainda está em andamento
      let agora = this.dataService.agora();
      let final = new Date(status._final);

      if (final.getTime() <= agora.getTime()) {

        // Tenta o dia seguinte, caso especificado

        if (!continuar) return resolve(null);
        this.resultDisplay.data = data;
        let novaData = new Date(data.getTime() + 24 * 60 * 60000);
        resolve(await this.carregaStatus(false, novaData));

      }
      else resolve([data, status]);

    });

  }

  async carregaCandidatos() {

    let resultado = await this.votacaoService.getCandidatos(this.data);
    // resultado = null; // Debugging

    if (!resultado || resultado instanceof HttpErrorResponse) {

      // Falha ao carregar os candidatos
      this.mostrarErroGeral = true;
      return;

    }

    this.candidatos = resultado;
    if (this.candidatos.length > 0) this.selecionado = this.candidatos[0]._id;
    this.mostrarVotacao = true;

  }

  async carregaVotos() {

    let resultado = await this.votacaoService.getResultado(this.data);
    // resultado = null; // Debugging

    if (!resultado || resultado instanceof HttpErrorResponse) {

      // Falha ao carregar os votos
      this.mostrarErroGeral = true;
      return;

    }

    this.votesDisplay.votos = resultado._totalVotos;
    this.mostrarResultado = true;

  }

  carregaTitulo(data : Date) {

    let hoje = this.dataService.hoje();
    if (hoje.getDate() == data.getDate()) this.titulo = "Votação de Hoje!";
    else this.titulo = "Votação de Amanhã";

  }

  async carregar() {

    // Esconder erros
    this.mostrarErroGeral = false;
    this.mostrarVotacao = false;

    // Tentar carregar o status correto
    let status = await this.carregaStatus();
    if (!status) { this.mostrarErroGeral = true; return; }

    // Armazena data atual
    this.data = status[0];

    // Carregar o título de acordo
    this.carregaTitulo(status[0]);

    // Verifica status do voto
    if (status[1]._jaVotou) this.carregaVotos();
    else this.carregaCandidatos();

  }

  // Lifecycle

  async ngOnInit() {

    this.carregar();

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
