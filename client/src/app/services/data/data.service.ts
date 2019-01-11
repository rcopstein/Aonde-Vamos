import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Variaveis

  data : Date;

  // Metodos

  hoje() : Date {
    return this.data;
  }

  agora() : Date {
    //return new Date();
    return new Date(2019, 0, 9, 10, 0, 0, 0);
  }

  amanha() : Date {
    return new Date(this.data.getTime() + 24 * 60 * 60000);
  }

  // Construtor

  constructor() {
    this.data = new Date(2019, 0, 10);
    this.data.setHours(0, 0, 0, 0);

    console.log(this.data);
  }

}
