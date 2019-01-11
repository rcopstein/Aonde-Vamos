import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante';
import { DataService } from 'src/app/services/data/data.service';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.sass']
})
export class VotingComponent implements OnInit {

  // Variaveis

  matricula : string;
  titulo : string = "";
  selecionado : string;
  candidatos : Array<Restaurante>;

  // Metodos

  onSubmit() {

    console.log("Form foi submetido com o valor " + this.selecionado + "!");

  }

  // Lifecycle

  async ngOnInit() {

    let hoje = this.dataService.hoje();
    let votacaoHoje = await this.votacaoService.getResultado(hoje);

    let agora = this.dataService.agora();
    let final = new Date(votacaoHoje._final);
    if (final.getTime() > agora.getTime()) {

      this.titulo = "Votação de hoje";
      this.candidatos = await this.votacaoService.getCandidatos(hoje);
      if (this.candidatos && this.candidatos.length > 0) this.selecionado = this.candidatos[0]._id;

    }
    else {

      this.titulo = "Votação de amanhã";
      let amanha = this.dataService.amanha();
      this.candidatos = await this.votacaoService.getCandidatos(amanha);
      if (this.candidatos && this.candidatos.length > 0) this.selecionado = this.candidatos[0]._id;

    }

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
