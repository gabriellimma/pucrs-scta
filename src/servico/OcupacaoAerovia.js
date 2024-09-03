import { validate } from "bycontract";
import { recuperaAeroviaPorID } from "./ServicoAerovia.js";
import fs from "fs";

/**
 * Método que recupera a ocupação de uma aerovia em uma determinada data
 * @param {String} idAerovia 
 * @param {String} data DD/MM/AAAA
 * @param {String} filePath - Caminho do arquivo de ocupação da aerovia - Default: "./src/data/ocupacao-aerovia.json"
 * @returns {Object} - Retorna um objeto com as datas ocupadas e as aerovias livres
 */
function recuperaOcupacaoAerovia(idAerovia, data, filePath = "./src/data/ocupacao-aerovia.json") {
  // Valida os argumentos de entrada
  validate(arguments, ["string", "string"]);

  // Lista com todos os slots disponíveis
  const slotsDisponiveis = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24
  ];

  // Inicializa a lista de ocupacao-aerovia persistida no arquivo json
  let ocupacao = [];

  let aeroviasLivres = [];
  let datasOcupadas = [];

  // Se o arquivo existir, carrega as aerovias
  if (fs.existsSync(filePath)) {
    // Lê o conteúdo do arquivo de aerovias
    const fileContent = fs.readFileSync(filePath, "utf8");
    // Converte o conteúdo do arquivo para um objeto JSON e atribui à lista de aerovias
    ocupacao = JSON.parse(fileContent);
  }

  // Procura a aerovia pelo id informado no arquvo "{filepath}.json"
  let aeroviaOcupacao = ocupacao.find((a) => a.idAerovia === idAerovia);

  // Se a aerovia foi encontrada
  if (aeroviaOcupacao) {
    // Recupera as altitudes da aerovia
    let altitudes = aeroviaOcupacao.altitudes;
    // Para cada altitude, verifica se a data informada possui slots ocupados
    altitudes.forEach(altitude => {
      // Se a data informada possuir slots ocupados
      if (altitude.datas[data]) {
        // Adiciona a altitude e a quantidade de slots ocupados na lista de datas ocupadas
        datasOcupadas.push({
          altitude: altitude.altitude,
          data: data,
          slots_ocupados: altitude.datas[data]
        });

        // Se a quantidade de slots ocupados for menor que 24 (horas)
        if (altitude.datas[data].length < 24) {
          let slotsDesocupados = [];
          // itera sobre as 24 horas do dia
          slotsDisponiveis.forEach(slot => {
            // Adiciona os slots desocupados na lista de slots desocupados
            if (!altitude.datas[data].includes(slot)) {
              slotsDesocupados.push(slot);
            }
          });
          // Se houver slots desocupados
          if (slotsDesocupados.length > 0) {
            // Adiciona a altitude e a quantidade de slots ocupados na lista de aerovias livres
            aeroviasLivres.push({
              altitude: altitude.altitude,
              data: data,
              slots_desocupados: slotsDesocupados
            });
          }
        }
      } else {
        // Adiciona a altitude na lista de altitudes livres
        aeroviasLivres.push({
          altitude: altitude.altitude,
          data: data,
          slots_desocupados: altitude.datas[data] ? altitude.datas[data] : slotsDisponiveis
        });
      }
    });
  }
  // Retorna a lista de datas ocupadas e aerovias livres para a data informada
  return {
    "datasOcupadas": datasOcupadas,
    "aeroviasLivres": aeroviasLivres
  };
}

/**
 * Método que recupera as altitudes livres de uma aerovia em uma determinada data
 * @param {*} idAerovia 
 * @param {*} data 
 * @returns 
 */
function altitudesLivres(idAerovia, data) {

  // Valida os argumentos de entrada
  validate(arguments, ["string", "string"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia);

  // Recupera a ocupação da aerovia
  const ocupacao = recuperaOcupacaoAerovia(aerovia.id, data);

  // Retorna as altitudes livres
  return ocupacao.aeroviasLivres;
}

/**
 * Método que retorna as altitudes livres de uma aerovia para uma determinada data e hora
 * @param {string} idAerovia - ID da aerovia
 * @param {string} data - Data no formato DD/MM/AAAA
 * @param {number} hora - Hora do dia no formato 24 horas (1-24)
 * @returns 
 */
function altitudesLivresDataHora(idAerovia, data, hora) {

  // Valida os argumentos de entrada
  validate(arguments, ["string", "string", "number"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia);

  // Recupera a ocupação da aerovia
  const ocupacao = recuperaOcupacaoAerovia(aerovia.id, data);

  // retorna as altitudes livres para uma determinada hora
  return ocupacao.aeroviasLivres.filter(altitude => altitude.slots_desocupados.includes(hora));
}

// Exporta a função de recuperação de ocupação de aerovia e altitudes livres
export { recuperaOcupacaoAerovia, altitudesLivres, altitudesLivresDataHora };