import { validate } from "bycontract";
import exp from "constants";

/**
 * Super classe Aerovia que representa uma aerovia.
 */
class Aerovia {

  // Propriedades
  id
  origem
  destino
  tamanho
  static aerovias = [];

  /**
   * Construtor da superclasse Aerovia
   * @param {string} id 
   * @param {string} origem 
   * @param {string} destino 
   * @param {number} tamanho 
   */
  constructor(id, origem, destino, tamanho) {
    validate(arguments, ["string", "string", "string", "number"]);
    this.id = id;
    this.origem = origem;
    this.destino = destino;
    this.tamanho = tamanho;
    Aerovia.aerovias.push(this);
  }

  /**
   * Método que retorna um array com
   * todas as aerovias cadastradas.
   * @returns {Aerovia[]}
   */
  static todas() {
    return Aerovia.aerovias;
  }

  /**
   * Método que retorna um objeto com os dados da aerovia.
   * @returns {Aerovia}
   */
  toString() {
    return {
      id: this.id,
      origem: this.origem,
      destino: this.destino,
      tamanho: this.tamanho
    };
  }
}

export { Aerovia };