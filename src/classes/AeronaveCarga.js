import { validate } from "bycontract";
import { AeronaveComercial } from "./AeronaveComercial.js";

/**
 * Classe AeronaveCarga que representa uma aeronave de carga.
 * @extends AeronaveComercial
 */
class AeronaveCarga extends AeronaveComercial {

  // Propriedades
  pesoMax

  /**
   * construtor da classe AeronaveCarga
   * @param {string} prefixo 
   * @param {number} velocidadeCruzeiro 
   * @param {number} autonomia 
   * @param {string} nomeCIA
   * @param {number} pesoMax 
   */
  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, pesoMax) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "string", "number"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia, nomeCIA);
    // Inicializa a propriedade pesoMax
    this.pesoMax = pesoMax;
  }

  /**
   * Método que retorna um objeto com os dados da aeronave.
   * @returns {AeronaveCarga}
   */
  toString() {
    return {
      // Chama o método toString da superclasse
      ...super.toString(),
      // Adiciona os dados da subclasse
      pesoMax: this.pesoMax
    };
  }
}

// Exporta a classe AeronaveCarga para ser usada em outras classes
export { AeronaveCarga };