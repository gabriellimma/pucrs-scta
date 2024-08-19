import { validate } from "bycontract";

// Classe Aeronave
class Aeronave {

  // Propriedades
  prefixo
  velocidadeCruzeiro
  autonomia

  // Método construtor
  constructor(prefixo, velocidadeCruzeiro, autonomia) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number"]);
    // Inicializa as propriedades da classe
    this.prefixo = prefixo;
    this.velocidadeCruzeiro = velocidadeCruzeiro;
    this.autonomia = autonomia;
  }

  // Método toString da classe para retornar os dados da aeronave
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