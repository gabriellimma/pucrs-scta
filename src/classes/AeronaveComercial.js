import { Aeronave } from "./Aeronave.js";
import { validate } from "bycontract";

/**
 * Classe AeronaveComercial que representa uma aeronave comercial.
 * @extends Aeronave
 */
class AeronaveComercial extends Aeronave {

  // Propriedades
  nomeCIA

  /**
   * Construtor da classe AeronaveComercial
   * @param {string} prefixo 
   * @param {number} velocidadeCruzeiro 
   * @param {number} autonomia 
   * @param {string} nomeCIA 
   */
  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "string"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia);
    // Inicializa a propriedade nomeCIA
    this.nomeCIA = nomeCIA;
  }

  /**
   * Método que retorna um objeto com os dados da aeronave comercial.
   * @returns {AeronaveComercial}
   */
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