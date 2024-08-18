import { Aeronave } from "./Aeronave";
import { validate } from "bycontract";

class AeronaveParticular extends Aeronave {

  respManutencao

  constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao) {
    validate(arguments, ["string", "number", "number", "string"]);
    super(prefixo, velocidadeCruzeiro, autonomia);
    this.respManutencao = respManutencao;
  }
}

export { AeronaveParticular };