import { Aeronave } from "../classes/Aeronave.js";

// Define a variável global Aeronave para usar no validate
globalThis.Aeronave = Aeronave;

// função que retorna todas as aeronaves cadastradas
/**
 * Função que retorna todas as aeronaves cadastradas durante
 * a execução do programa.
 * @returns Array[Aeronave]
 */
function todas() {
  return Aeronave.todas()
}

// Exporta a função "todas" para ser usada em outros módulos
export { todas }
