import { validate } from "bycontract";
import { Aerovia } from "../classes/Aerovia.js";
import fs from "fs";

/**
 * Função que recupera uma aerovia a partir de uma origem e destino.
 * @param {string} origem 
 * @param {string} destino 
 * @returns 
 */
function recupera(origem, destino) {
  // Valida os argumentos de entrada
  validate(arguments, ["string", "string"]);

  // Se o arquivo de aerovias existir, carrega as aerovias
  if (fs.existsSync("./src/data/aerovias.json")) {
    const fileContent = fs.readFileSync("./src/data/aerovias.json", "utf8");
    Aerovia.aerovias = JSON.parse(fileContent);
  }

  // Procura a aerovia na lista de aerovias
  const aerovia = Aerovia.todas().find(a => a.origem === origem && a.destino === destino);
  // Se não encontrar a aerovia, lança uma exceção
  if (!aerovia) {
    throw new Error("Aerovia não encontrada.");
  }
  // Retorna a aerovia encontrada
  return aerovia;
}

/**
 * Função que recupera uma aerovia a partir de um ID.
 * @param {string} id da aerovia
 * @returns {Aerovia} aerovia
 */
function recuperaAeroviaPorID(id) {
  // Valida os argumentos de entrada
  validate(arguments, ["string"]);

  // Se o arquivo de aerovias existir, carrega as aerovias
  if (fs.existsSync("./src/data/aerovias.json")) {
    // Lê o conteúdo do arquivo de aerovias
    const fileContent = fs.readFileSync("./src/data/aerovias.json", "utf8");
    // Converte o conteúdo do arquivo para um objeto JSON e atribui à lista de aerovias
    Aerovia.aerovias = JSON.parse(fileContent);
  }

  // Procura a aerovia na lista de aerovias
  const aerovia = Aerovia.todas().find(a => a.id === id);
  // Se não encontrar a aerovia, lança uma exceção
  if (!aerovia) {
    throw new Error("Aerovia não encontrada.");
  }
  // Retorna a aerovia encontrada
  return aerovia;
}

// Exporta a função recupera para ser usada em outras classes
export { recupera, recuperaAeroviaPorID };