
import { validate } from "bycontract";
import { Piloto } from "../classes/Piloto.js";

/**
 * Recupera um piloto pelo seu 
 * número de matrícula.
 * @param {string} matricula 
 */
function recupera(matricula) {
  // valida a entrada de dados da função
  validate(arguments, ["string"]);

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

export { recupera, todos };