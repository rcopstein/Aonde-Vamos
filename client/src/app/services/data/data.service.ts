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
    return new Date();
  }

  amanha() : Date {
    return new Date(this.data.getTime() + 24 * 60 * 60000);
  }

  utcParaLocal(data : Date) : Date {
    return new Date(data.getTime() + data.getTimezoneOffset() * 60000);
  }

  // Construtor

  constructor() {
    this.data = new Date();
    this.data.setHours(0, 0, 0, 0);

    console.log(this.data);
  }

}
