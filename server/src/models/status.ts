export class Status {

    // Propriedades

    get data() : Date {
        return this._data;
    }

    get final() : Date {
        return this._final;
    }

    get inicio() : Date {
        return this._inicio;
    }

    get jaVotou() : boolean {
        return this._jaVotou;
    }

    // Construtor

    constructor(private _data : Date, private _inicio : Date, private _final : Date, private _jaVotou : boolean) {}

}