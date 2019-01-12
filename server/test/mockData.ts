import { Restaurante } from "../src/models/restaurante";

export default {

    usuarios : [
        "192.168.10.1",
        "10.0.0.2",
    ],

    restaurantes : [
        new Restaurante("1", "Taverna", "White Harbour", "Melhor carne de cordeiro dos sete reinos"),
        new Restaurante("2", "Salão Real", "King's Landing", "Melhor carne de cordeiro dos sete reinos (também)"),
        new Restaurante("3", "Palatus", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que tem suco depois das 13:30"),
        new Restaurante("4", "Trinta e Dois", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que a gente vai quando enjoa do Palatus"),
        new Restaurante("5", "Panorama", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que a gente só vai de vez em quando porque é caro"),
        new Restaurante("6", "La Pizza Mia", "R. Carlos Trein Filho, 91 - Auxiliadora, Porto Alegre - RS, 90450-120", "Aquele que dá pra pedir 2km de pizza"),
        new Restaurante("7", "Spoiler", "R. Gen. Lima e Silva, 1058 - Centro Histórico, Porto Alegre - RS, 90050-102", "Aquele que te conta o final de Game of Thrones"),
        new Restaurante("8", "Koh Pee Pee", "R. Schiller, 83 - Rio Branco, Porto Alegre - RS, 90430-150", "Aquele que tu tem que levar um rim extra pra pagar"),
    ]

}