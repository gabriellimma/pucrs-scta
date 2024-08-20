import { validate } from "bycontract";
import { Aerovia } from "../classes/Aerovia.js";

/**
 * Função que recupera uma aerovia a partir de uma origem e destino.
 * @param {string} origem 
 * @param {string} destino 
 * @returns 
 */
function recupera(origem, destino) {
  // Valida os argumentos de entrada
  validate(arguments, ["string", "string"]);
  // Procura a aerovia na lista de aerovias
  const aerovia = Aerovia.todas().find(a => a.origem === origem && a.destino === destino);
  // Se não encontrar a aerovia, lança uma exceção
  if (!aerovia) {
    throw new Error("Aerovia não encontrada.");
  }
  // Retorna a aerovia encontrada
  return aerovia;
}

// Exporta a função recupera para ser usada em outras classes
export { recupera };