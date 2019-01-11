import { Component, OnInit } from '@angular/core';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { Votacao } from 'src/app/model/votacao';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.sass']
})
export class ResultDisplayComponent implements OnInit {

  // Variaveis

  resultado : Votacao;
  deveAparecer : boolean = false;

  // Lifecycle

  async ngOnInit() {

    let hoje = this.dataService.hoje();
    let agora = this.dataService.agora();
    var votacao = await this.votacaoService.getResultado(hoje);
    let final = new Date(votacao._final);

    if (!votacao || final.getTime() > agora.getTime()) {
      this.deveAparecer = false;
    }
    else {
      this.deveAparecer = true;
      this.resultado = votacao;
    }

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
