import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Votacao } from 'src/app/model/votacao';
import { Restaurante } from 'src/app/model/restaurante';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {

  // Variaveis

  domain : string = "http://localhost:3000";
  baseURL : string = "/votacao";

  // Metodos

  private montarURL(base : string, data : Date) {
    return this.domain + base + '/' + data.getFullYear() + '/' + (data.getMonth() + 1) + '/' + data.getDate();
  }

  async getResultado(data : Date) : Promise<Votacao> {

    // Montar URL
    var votacao : Votacao;
    let url = this.montarURL(this.baseURL, data);

    // Criar Promise
    let promise = new Promise<Votacao>( (resolve, reject) => {

      // Fazer uma chamada HTTP
      this.http.get<Votacao>(url).subscribe( item => resolve(item) );

    });

    // Retorna Promise
    return promise;

  }

  async getCandidatos(data : Date) : Promise<Array<Restaurante>> {

    // Montar URL
    let url = this.montarURL(this.baseURL, data);
    url += "/candidatos";

    // Criar Promise
    let promise = new Promise<Array<Restaurante>>( (resolve, reject) => {

      // Fazer uma chamada HTTP
      this.http.get<Array<Restaurante>>(url).subscribe( result => resolve(result) );

    });

    // Retorna Promise
    return promise;

  }

  async votar(data : Date, matricula : string, restaurante : string) : Promise<any> {

    // Montar URL
    let url = this.montarURL(this.baseURL, data);

    // Montar parametros da request
    let body = {
      'restaurante' : restaurante,
      'matricula' : matricula
    }

    // Criar Promise
    let promise = new Promise<any>( (resolve, _) => {

      // Fazer uma chamada HTTP
      this.http.post(url, body, { responseType: "text" }).subscribe(

        _ => resolve(true),
        error => { console.log(error); resolve(error) }

      );

    });

    // Retorna Promise
    return promise;

  }

  // Construtor

  constructor(private http : HttpClient) { }

}