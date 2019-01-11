import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante';
import { DataService } from 'src/app/services/data/data.service';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VotesDisplayComponent } from '../votes-display/votes-display.component';

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
  matricula : string = "123456789-0";

  mostrarVotacao : boolean = true;
  @ViewChild(VotesDisplayComponent) votesDisplay : VotesDisplayComponent;

  // Metodos

  onSubmit() {

    this.habilitado = false;
    let promise = this.votacaoService.votar(this.data, this.matricula, this.selecionado);

    promise.then( async (result) => {

      if (!(result instanceof HttpErrorResponse)) {

        let votacao = await this.votacaoService.getResultado(this.data);
        this.mostrarVotacao = false;

        this.votesDisplay.votos = votacao._totalVotos;
        return;

      }

      if (result.status == 400) console.log("Matrícula possui um valor inválido!");
      else if (result.status == 404) console.log("Não foi encontrado um usuário com essa matrícula!");
      else console.log("Falha ao enviar formulário, tente novamente!");

      this.habilitado = true;

    });

  }

  async carregaVotacao() {

    let hoje = this.dataService.hoje();
    let amanha = this.dataService.amanha();

    let votacao = await this.votacaoService.getResultado(hoje);

    let agora = this.dataService.agora();
    let final = new Date(votacao._final);

    if (final.getTime() > agora.getTime()) {

      this.data = hoje;
      this.titulo = "Votação de hoje";

    }
    else {

      this.data = amanha;
      this.titulo = "Votação de amanhã";

    }

  }

  async carregaCandidatos() {

    this.candidatos = await this.votacaoService.getCandidatos(this.data);
    if (this.candidatos && this.candidatos.length > 0) this.selecionado = this.candidatos[0]._id;

  }

  // Lifecycle

  async ngOnInit() {

    await this.carregaVotacao();
    await this.carregaCandidatos();

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
