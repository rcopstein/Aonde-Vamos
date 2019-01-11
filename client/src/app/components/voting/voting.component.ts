import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante';
import { DataService } from 'src/app/services/data/data.service';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.sass']
})
export class VotingComponent implements OnInit {

  // Variaveis

  titulo : string = "";
  habilitado : boolean = true;

  matricula : string;
  selecionado : string;
  candidatos : Array<Restaurante>;

  // Metodos

  onSubmit() {

    this.habilitado = false;
    let promise = this.votacaoService.votar(this.dataService.hoje(), this.matricula, this.selecionado);

    promise.then( result => {

      if (!(result instanceof HttpErrorResponse)) return console.log("Sucesso!");

      if (result.status == 400) {
        console.log("Matrícula possui um valor inválido!");
      }
      else if (result.status == 404) {
        console.log("Não foi encontrado um usuário com essa matrícula!");
      }
      else {
        console.log("Falha ao enviar formulário, tente novamente!");
      }

      this.habilitado = true;

    });

  }

  // Lifecycle

  async ngOnInit() {

    let hoje = this.dataService.hoje();
    let votacaoHoje = await this.votacaoService.getResultado(hoje);

    let agora = this.dataService.agora();
    let final = this.dataService.utcParaLocal(new Date(votacaoHoje._final));

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
