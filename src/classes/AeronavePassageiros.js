import { validate } from "bycontract";
import { Aeronave } from "./Aeronave.js";

// Classe AeronavePassageiros
class AeronavePassageiros extends Aeronave {

  // Propriedades
  maxPassageiros

  // Método construtor
  constructor(prefixo, velocidadeCruzeiro, autonomia, maxPassageiros) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "number"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia);
    // Inicializa a propriedade maxPassageiros
    this.maxPassageiros = maxPassageiros;
  }

  // Sobrescreve o método toString da superclasse
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