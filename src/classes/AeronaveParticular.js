import { Aeronave } from "./Aeronave.js";
import { validate } from "bycontract";

/**
 * Classe AeronaveParticular que representa uma aeronave particular.
 * @extends Aeronave
 */
class AeronaveParticular extends Aeronave {

  respManutencao

  /**
   * construtor da classe AeronaveParticular
   * @param {string} prefixo 
   * @param {number} velocidadeCruzeiro 
   * @param {number} autonomia 
   * @param {string} respManutencao 
   */
  constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "string"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia);
    // Inicializa a propriedade respManutencao
    this.respManutencao = respManutencao;
  }

  /**
   * Método que retorna um objeto com os dados da aeronave particular.
   * @returns {AeronaveParticular}
   */
  toString() {
    return {
      // Chama o método toString da superclasse
      ...super.toString(),
      // Adiciona os dados da subclasse
      respManutencao: this.respManutencao
    };
  }
}

// Exporta a classe AeronaveParticular para ser usada em outras classes
export { AeronaveParticular };