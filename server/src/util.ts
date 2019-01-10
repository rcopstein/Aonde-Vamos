export function calculaSemana(data : Date) : number {

    var diaSemana = data.getDay() * 24 * 60 * 60000; // Determina quanto tempo passou desde o início da semana
    var ultimoDomingo = new Date(data.getTime() - diaSemana);
    return ultimoDomingo.getTime();

}

export function mesmaSemana(data1 : Date, data2 : Date) : boolean {

    return calculaSemana(data1) == calculaSemana(data2);

}

export function mesmoDia(data1 : Date, data2 : Date) : boolean {

    return data1.getFullYear() == data2.getFullYear() &&
           data1.getMonth() == data2.getMonth() &&
           data1.getDate() == data2.getDate();

}