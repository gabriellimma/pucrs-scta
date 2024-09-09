import { validate } from "bycontract";

/**
 * Super classe Aerovia que representa uma aerovia.
 */
class Aerovia {

  // Propriedades
  idAerovia
  origem
  destino
  tamanho
  static aerovias = [];

  /**
   * Construtor da superclasse Aerovia
   * @param {string} idAerovia 
   * @param {string} origem 
   * @param {string} destino 
   * @param {number} tamanho 
   */
  constructor(idAerovia, origem, destino, tamanho) {
    validate(arguments, ["string", "string", "string", "number"]);
    this.idAerovia = idAerovia;
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
      idAerovia: this.idAerovia,
      origem: this.origem,
      destino: this.destino,
      tamanho: this.tamanho
    };
  }
}

// Exporta a classe Aerovia para ser usada em outras classes
export { Aerovia };