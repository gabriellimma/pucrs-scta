import { Aeronave } from "./Aeronave.js";
import { validate } from "bycontract";

// Classe AeronaveParticular
class AeronaveParticular extends Aeronave {

  respManutencao

  // Método construtor
  constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "string"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia);
    // Inicializa a propriedade respManutencao
    this.respManutencao = respManutencao;
  }

  // Sobrescreve o método toString da superclasse
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