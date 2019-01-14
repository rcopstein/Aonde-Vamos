import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Votacao } from 'src/app/model/votacao';
import { Restaurante } from 'src/app/model/restaurante';
import { Status } from 'src/app/model/status';

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

  async getStatus(data : Date) : Promise<Status> {

    // Montar URL
    let url = this.montarURL(this.baseURL, data);

    // Retorna Promise
    return this.http.get<Status>(url).toPromise().catch( e => e );

  }

  async getResultado(data : Date) : Promise<Votacao> {

    // Montar URL
    let url = this.montarURL(this.baseURL, data) + '/resultado';

    // Retorna Promise
    return this.http.get<Votacao>(url).toPromise().catch( e => e );

  }

  async getCandidatos(data : Date) : Promise<Array<Restaurante>> {

    // Montar URL
    let url = this.montarURL(this.baseURL, data);
    url += "/candidatos";

    // Retorna Promise
    return this.http.get<Array<Restaurante>>(url).toPromise().catch( e => e );

  }

  async votar(data : Date, restaurante : string) : Promise<any> {

    // Montar URL
    let url = this.montarURL(this.baseURL, data);

    // Montar parametros da request
    let body = { 'restaurante' : restaurante }

    // Retorna Promise
    return this.http.post(url, body, { responseType: "text" }).toPromise().catch( e => e );

  }

  // Construtor

  constructor(private http : HttpClient) { }

}
