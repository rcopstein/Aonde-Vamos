import { Component, OnInit, Input } from '@angular/core';
import { VotacaoService } from 'src/app/services/votacao/votacao.service';
import { Votacao } from 'src/app/model/votacao';
import { DataService } from 'src/app/services/data/data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.sass']
})
export class ResultDisplayComponent {

  // Variaveis

  private _data : Date;
  private _erro : boolean;
  private _resultado : Votacao;

  // Metodos

  onRetry() {
    this.carregaResultado(this._data);

  }

  async carregaResultado(data : Date) {

    this._erro = false;
    let resultado = await this.votacaoService.getResultado(data);
    // resultado = null; // Debugging

    if (!resultado || resultado instanceof HttpErrorResponse) {

      // Mostrar estado de falha
      this._erro = true;
      return;

    }

    this._resultado = resultado;

  }

  // Propriedades

  @Input() set data(data : Date) {

    if (this._data && 
        this._data.getFullYear() == data.getFullYear() &&
        this._data.getMonth() == data.getMonth() &&
        this._data.getDate() == data.getDate()) return;

    this._data = data;
    this.carregaResultado(this._data);

  }

  // Construtor

  constructor(private votacaoService : VotacaoService, private dataService : DataService) { }

}
