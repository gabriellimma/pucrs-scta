import { validate } from "bycontract";

class Aeronave {

  prefixo
  velocidadeCruzeiro
  autonomia

  constructor(prefixo, velocidadeCruzeiro, autonomia) {
    validate(arguments, ["string", "number", "number"]);
    this.prefixo = prefixo;
    this.velocidadeCruzeiro = velocidadeCruzeiro;
    this.autonomia = autonomia;
  }
}

export { Aeronave };