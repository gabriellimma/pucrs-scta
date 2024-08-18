import { Aeronave } from "./Aeronave";
import { validate } from "bycontract";

class AeronaveComercial extends Aeronave {

  nomeCIA

  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
    validate(arguments, ["string", "number", "number", "string"]);
    super(prefixo, velocidadeCruzeiro, autonomia);
    this.nomeCIA = nomeCIA;
  }
}

export { AeronaveComercial };