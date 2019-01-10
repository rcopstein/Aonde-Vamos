import { Usuario } from "../src/models/usuario";
import { Restaurante } from "../src/models/restaurante";

export default {

    usuario1 : new Usuario("João das Neves", "194382000-2"),
    usuario2 : new Usuario("Jorah dos Monte", "847928374-5"),
    
    restaurante1 : new Restaurante("1", "Taverna", "White Harbour", "Melhor carne de cordeiro dos sete reinos"),
    restaurante2 : new Restaurante("2", "Salão Real", "King's Landing", "Melhor carne de cordeiro dos sete reinos (também)"),

}