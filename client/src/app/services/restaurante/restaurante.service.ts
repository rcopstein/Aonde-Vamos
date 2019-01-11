import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from 'src/app/model/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  // Variaveis

  domain : string = "http://localhost:3000";

  // Metodos

  public getRestaurante(idRestaurante : string) : Promise<Restaurante> {

    // Montar URL
    let url = this.domain + "/restaurante/" + idRestaurante;

    // Criar Promise
    let promise = new Promise<Restaurante>( (resolve, reject) => {

      // Fazer uma chamada HTTP
      this.http.get<Restaurante>(url).subscribe( item => resolve(item) );

    });

    // Retorna Promise
    return promise;

  }

  // Construtor

  constructor(private http : HttpClient) {}

}
