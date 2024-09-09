import { validate } from "bycontract";
import { Piloto } from "../classes/Piloto.js";
import fs from "fs";

/**
 * Recupera um piloto pelo seu 
 * número de matrícula.
 * @param {string} matricula 
 */
function recupera(matricula) {
  // valida a entrada de dados da função
  validate(arguments, ["string"]);

  // se o arquivo  cadastro-pilotos.json existir, carrega os pilotos cadastrados
  if (fs.existsSync("./src/data/cadastro-pilotos.json")) {
    const fileContent = fs.readFileSync("./src/data/cadastro-pilotos.json", "utf8");
    Piloto.pilotosCadastrados = JSON.parse(fileContent);
  }

  // recupera o piloto pelo número de matrícula
  let piloto = Piloto.todos().find(p => p.matricula === matricula);

  // se não encontrar o piloto, lança um erro
  if (!piloto) {
    throw new Error("Piloto não encontrado.");
  }
  // retorna o piloto encontrado
  return piloto;
}

/**
 * Recupera todos os pilotos 
 * cadastrados.
 */
function todos() {
  return Piloto.todos();
}

// Exporta as funções recupera e todos para serem usadas em outras classes
export { recupera, todos };