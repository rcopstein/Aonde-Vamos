import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Variaveis

  private _data : Date;

  // Propriedades

  private get data() : Date {
    if (this._data) return this._data;
    return new Date();
  }

  private set data(data : Date) {
    this._data = data;
  }

  // Metodos

  hoje() : Date {
    let data = this.data;
    data.setHours(0, 0, 0, 0);
    return data;
  }

  agora() : Date {
    return this.data;
  }

  amanha() : Date {
    return new Date(this.data.getTime() + 24 * 60 * 60000);
  }

  utcParaLocal(data : Date) : Date {
    return new Date(data.getTime() + data.getTimezoneOffset() * 60000);
  }

  // Para debug
  modificarData(data : Date) {
    this.data = data;
  }

  // Construtor

  constructor() {}

}
