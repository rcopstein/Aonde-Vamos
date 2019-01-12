import { Component, OnInit, Input } from '@angular/core';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { Votacao } from 'src/app/model/votacao';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.sass']
})
export class ResultDisplayComponent {

  // Variaveis

  resultado : Votacao;

  // Propriedades

  @Input() set data(data : Date) {

    this.votacaoService.getResultado(data).then( result => this.resultado = result );

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
