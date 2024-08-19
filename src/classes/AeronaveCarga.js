import { validate } from "bycontract";
import { Aeronave } from "./Aeronave.js";

// Classe AeronaveCarga
class AeronaveCarga extends Aeronave {

  // Propriedades
  pesoMax

  // Método construtor
  constructor(prefixo, velocidadeCruzeiro, autonomia, pesoMax) {
    // Valida os argumentos de entrada
    validate(arguments, ["string", "number", "number", "number"]);
    // Chama o método construtor da superclasse passando os argumentos
    super(prefixo, velocidadeCruzeiro, autonomia);
    // Inicializa a propriedade pesoMax
    this.pesoMax = pesoMax;
  }

  // Sobrescreve o método toString da superclasse
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