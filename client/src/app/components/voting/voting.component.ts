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

  mostrarVotacao : boolean = true;
  @ViewChild(VotesDisplayComponent) votesDisplay : VotesDisplayComponent;
  @ViewChild(ResultDisplayComponent) resultDisplay : ResultDisplayComponent;

  // Metodos

  onSubmit() {

    this.habilitado = false;
    let promise = this.votacaoService.votar(this.data, this.selecionado);

    promise.then( async (result) => {

      if (!(result instanceof HttpErrorResponse)) {

        this.mostrarVotacao = false;
        this.carregaResultado();
        return;

      }

      if (result.status == 400) console.log("Matrícula possui um valor inválido!");
      else if (result.status == 404) console.log("Não foi encontrado um usuário com essa matrícula!");
      else console.log("Falha ao enviar formulário, tente novamente!");

      this.habilitado = true;

    });

  }

  async carregaVotacao() : Promise<Status> {

    let hoje = this.dataService.hoje();
    let amanha = this.dataService.amanha();

    let promise = new Promise<[Date, Status]>( async (resolve, reject) => {

      let status = await this.votacaoService.getStatus(hoje);
      let agora = this.dataService.agora();
      let final = new Date(status._final);

      if (final.getTime() > agora.getTime()) {

        resolve([hoje, status]);

      }
      else {

        status = await this.votacaoService.getStatus(amanha);
        resolve([amanha, status]);

      }

    })
    .then( ([data, status]) => {

      this.data = data;
      if (data == hoje) {
        this.titulo = "Votação de hoje!";
      }
      else if (data == amanha) {
        this.titulo = "Votação de amanhã!";
        this.resultDisplay.data = hoje; // Mostra o resultado da votação de hoje
      }

      return status;

    });

    return promise;

  }

  async carregaCandidatos() {

    this.candidatos = await this.votacaoService.getCandidatos(this.data);
    if (this.candidatos && this.candidatos.length > 0) this.selecionado = this.candidatos[0]._id;

  }

  async carregaResultado() {

    let resultado = await this.votacaoService.getResultado(this.data);
    if (resultado) this.votesDisplay.votos = resultado._totalVotos;

  }

  // Lifecycle

  async ngOnInit() {

    let status = await this.carregaVotacao();

    this.mostrarVotacao = !status._jaVotou;
    if (!status._jaVotou) await this.carregaCandidatos();
    else this.carregaResultado();

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
