import { validate } from "bycontract";
import { AeronaveComercial } from "./AeronaveComercial.js";

/**
 * Classe AeronavePassageiros que representa uma aeronave de passageiros.
 * @extends AeronaveComercial
 */
class AeronavePassageiros extends AeronaveComercial {

  // Propriedades
  maxPassageiros

  /**
   * Construtor da classe AeronavePassageiros
   * @param {string} prefixo 
   * @param {number} velocidadeCruzeiro 
   * @param {number} autonomia 
   * @param {string} nomeCIA
   * @param {number} maxPassageiros 
   */
  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, maxPassageiros) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "string", "number"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia, nomeCIA);
    // Inicializa a propriedade maxPassageiros
    this.maxPassageiros = maxPassageiros;
  }

  /**
   * Método que retorna um objeto com os dados da aeronave de passageiros.
   * @returns {AeronavePassageiros}
   */
  toString() {
    return {
      // Chama o método toString da superclasse
      ...super.toString(),
      // Adiciona os dados da subclasse
      maxPassageiros: this.maxPassageiros
    };
  }
}

// Exporta a classe AeronavePassageiros para ser usada em outras classes
export { AeronavePassageiros };