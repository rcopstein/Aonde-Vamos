export function mesmoDia(data1 : Date, data2 : Date) : boolean {

    return data1.getFullYear() == data2.getFullYear() &&
           data1.getMonth() == data2.getMonth() &&
           data1.getDate() == data2.getDate();

}

export function addMinutos(data : Date, minutos : number) : Date {

    return new Date(Date.UTC(
        data.getUTCFullYear(),
        data.getUTCMonth(),
        data.getUTCDate(),
        data.getUTCHours(),
        data.getUTCMinutes() + minutos,
        data.getUTCSeconds(),
        data.getUTCMilliseconds()
    ));

}

export function addHoras(data : Date, horas : number) : Date {

    return new Date(Date.UTC(
        data.getUTCFullYear(),
        data.getUTCMonth(),
        data.getUTCDate(),
        data.getUTCHours() + horas,
        data.getUTCMinutes(),
        data.getUTCSeconds(),
        data.getUTCMilliseconds()
    ));

}

export function addDias(data : Date, dias : number) : Date {

    return new Date(Date.UTC(
        data.getUTCFullYear(),
        data.getUTCMonth(),
        data.getUTCDate() + dias,
        data.getUTCHours(),
        data.getUTCMinutes(),
        data.getUTCSeconds(),
        data.getUTCMilliseconds()
    ));

}