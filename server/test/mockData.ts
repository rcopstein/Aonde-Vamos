import { Usuario } from "../src/models/usuario";
import { Restaurante } from "../src/models/restaurante";

export default {

    usuario1 : new Usuario("João das Neves", "194382000-2"),
    usuario2 : new Usuario("Jorah dos Monte", "847928374-5"),

    restaurante1 : new Restaurante("1", "Taverna", "White Harbour", "Melhor carne de cordeiro dos sete reinos"),
    restaurante2 : new Restaurante("2", "Salão Real", "King's Landing", "Melhor carne de cordeiro dos sete reinos (também)"),
    restaurante3 : new Restaurante("3", "Palatus", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que tem suco depois das 13:30"),
    restaurante4 : new Restaurante("4", "Trinta e Dois", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que a gente vai quando enjoa do Palatus"),
    restaurante5 : new Restaurante("5", "Panorama", "Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS, 90619-900", "Aquele que a gente só vai de vez em quando porque é caro"),
    restaurante6 : new Restaurante("6", "La Pizza Mia", "R. Carlos Trein Filho, 91 - Auxiliadora, Porto Alegre - RS, 90450-120", "Aquele que dá pra pedir 2km de pizza"),
    restaurante7 : new Restaurante("7", "Spoiler", "R. Gen. Lima e Silva, 1058 - Centro Histórico, Porto Alegre - RS, 90050-102", "Aquele que te conta o final de Game of Thrones"),
    restaurante8 : new Restaurante("8", "Koh Pee Pee", "R. Schiller, 83 - Rio Branco, Porto Alegre - RS, 90430-150", "Aquele que tu tem que levar um rim extra pra pagar"),

}