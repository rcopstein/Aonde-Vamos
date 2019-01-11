import { Component, OnInit, Input } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-votes-display',
  templateUrl: './votes-display.component.html',
  styleUrls: ['./votes-display.component.sass']
})
export class VotesDisplayComponent {

  // Variaveis

  _votos : Array<[Restaurante, number]>;

  // Propriedades

  @Input() set votos(valor : Array<[string, number]>) {

    let total = 0;
    let votos = new Array<[Restaurante, number]>();

    valor.forEach( x => total += x[1]);
    valor.forEach( async x => {

      let pct = Math.round(x[1] / total) * 100;
      let restaurante = await this.restauranteService.getRestaurante(x[0]);

      if (!restaurante) return;
      votos.push([restaurante, pct]);

    });

    this._votos = votos;
    
  }

  // Construtor

  constructor(private restauranteService : RestauranteService) { }

}
