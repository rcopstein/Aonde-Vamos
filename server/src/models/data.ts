import { InvalidParameterError } from "../errors/invalidParameterError";

export class Data {

    static validarData(data : Date) : boolean {

        if (!data || !(data instanceof Date) || isNaN(data.getTime())) return false;
        return true;

    }

    static buildData(ano : number, mes : number, dia : number) {

        let data = new Date(ano + '-' + mes + '-' + dia);
        if (!this.validarData(data)) throw new InvalidParameterError();
        return data;

    }

    static buildDataFromString(input : string) {

        let data = new Date(input);
        if (!this.validarData(data)) throw new InvalidParameterError();
        return data;

    }

}