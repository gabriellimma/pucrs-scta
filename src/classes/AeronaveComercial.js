import { Aeronave } from "./Aeronave.js";
import { validate } from "bycontract";

// Classe AeronaveComercial
class AeronaveComercial extends Aeronave {

  // Propriedades
  nomeCIA

  // Método construtor
  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "string"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia);
    // Inicializa a propriedade nomeCIA
    this.nomeCIA = nomeCIA;
  }

  // Sobrescreve o método toString da superclasse
  toString() {
    return {
      // Chama o método toString da superclasse
      ...super.toString(),
      // Adiciona os dados da subclasse
      nomeCIA: this.nomeCIA
    };
  }
}

// Exporta a classe AeronaveComercial para ser usada em outras classes
export { AeronaveComercial };