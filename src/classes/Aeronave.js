import { validate } from "bycontract";

/**
 * Classe Aeronave que representa uma aeronave genérica.
 */
class Aeronave {

  // Propriedades
  prefixo
  velocidadeCruzeiro
  autonomia
  static aeronavesCadastradas = []

  /**
   * construtor da superclasse Aeronave
   * @param {string} prefixo 
   * @param {number} velocidadeCruzeiro 
   * @param {number} autonomia 
   */
  constructor(prefixo, velocidadeCruzeiro, autonomia) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number"]);
    // Inicializa as propriedades da classe
    this.prefixo = prefixo;
    this.velocidadeCruzeiro = velocidadeCruzeiro;
    this.autonomia = autonomia;
    // Armazena todas as aeronaves cadastradas 
    Aeronave.aeronavesCadastradas.push(this);
  }

  /**
   * Método estático da classe Aeronave que retorna
   * um array com todas as aeronaves cadastradas.
   * @returns {Array<Aeronave>}
   */
  static todas() {
    return Aeronave.aeronavesCadastradas;
  }

  /**
   * Método que retorna um objeto com os dados da aeronave.
   * @returns {Aeronave} 
   */
  toString() {
    // Retorna um objeto com os dados da aeronave  
    return {
      prefixo: this.prefixo,
      velocidadeCruzeiro: this.velocidadeCruzeiro,
      autonomia: this.autonomia
    };
  }
}

// Exporta a classe Aeronave para ser usada em outras classes
export { Aeronave };