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
    0,
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
    23
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
 * @param {string} [filePath="./src/data/ocupacao-aerovia.json"] - Caminho do arquivo de ocupação da aerovia - Default: "./src/data/ocupacao-aerovia.json"
 * @returns {Array<{altitude: number, data: string, slots_desocupados: number[]}>} - Retorna um array de objetos com as altitudes livres
 */
function altitudesLivres(idAerovia, data, filePath = "./src/data/ocupacao-aerovia.json") {

  // Valida os argumentos de entrada
  validate(arguments, ["string", "string"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia, filePath);

  // Recupera a ocupação da aerovia
  const ocupacao = recuperaOcupacaoAerovia(aerovia.idAerovia, data, filePath);

  // Retorna as altitudes livres
  return ocupacao.aeroviasLivres;
}

/**
 * Método que retorna as altitudes livres de uma aerovia para uma determinada data e hora
 * @param {string} idAerovia - ID da aerovia
 * @param {string} data - Data no formato DD/MM/AAAA
 * @param {number} hora - Hora do dia no formato 24 horas (0-23)
 * @returns 
 */
function altitudesLivresDataHora(idAerovia, data, hora, filePath = "./src/data/ocupacao-aerovia.json") {

  // Valida os argumentos de entrada
  validate(arguments, ["string", "string", "number"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia, filePath);

  // Recupera a ocupação da aerovia
  const ocupacao = recuperaOcupacaoAerovia(aerovia.idAerovia, data, filePath);

  // retorna as altitudes livres para uma determinada hora
  return ocupacao.aeroviasLivres.find(altitude => altitude.slots_desocupados.includes(hora));
}

/**
 * Método que ocupa uma aerovia em uma determinada data, altitude e slots de tempo
 * @param {string} idAerovia 
 * @param {string} data - Data no formato DD/MM/AAAA
 * @param {number} altitude - Altitude em pés 35000
 * @param {Array<number>} slots - Slots de tempo inteiros (0-23)
 * @param {string} [filePath="./src/data/ocupacao-aerovia.json"] - Caminho do arquivo de ocupação da aerovia - Default: "./src/data/ocupacao-aerovia.json"  
 */
function ocupa(idAerovia, data, altitude, slots, filePath = "./src/data/ocupacao-aerovia.json") {
  // Valida os argumentos de entrada
  validate(arguments, ["string", "string", "number", "array"]);

  // Valida se os slots estão no intervalo de 0 a 23
  for (let slot of slots) {
    if (slot < 0 || slot > 23) {
      throw new Error("Slot inválido.");
    }
    // Verifica se o slot está ocupado antes de persistir no array
    if (isOcupado(idAerovia, data, altitude, slot, filePath)) {
      throw new Error(`Slot ${slot}, da aerovia ${idAerovia} já está ocupado na data ${data} para a altitude ${altitude}`);
    }
  }

  // valida se o arquivo ocupacao-aerovia.json existe
  if (fs.existsSync(filePath)) {
    // Lê o conteúdo do arquivo de ocupacao-aerovia
    const fileContent = fs.readFileSync(filePath, "utf8");
    // Converte o conteúdo do arquivo para um objeto JSON e atribui à lista de ocupacao
    const ocupacao = JSON.parse(fileContent);

    // Procura a aerovia pelo id informado no arquvo "{filepath}.json"
    let aeroviaOcupacao = ocupacao.find((a) => a.idAerovia === idAerovia);

    // Se a aerovia foi encontrada ocupa o objeto "datas" com a data e os slots ocupados
    if (aeroviaOcupacao) {
      // Procura a altitude pelo id informado no arquvo "{filepath}.json"
      let altitudeOcupacao = aeroviaOcupacao.altitudes.find((a) => a.altitude === altitude);

      if (altitudeOcupacao) {
        // Se a data informada possuir slots ocupados
        if (altitudeOcupacao.datas[data]) {
          // Adiciona a altitude e a quantidade de slots ocupados na lista de datas ocupadas
          altitudeOcupacao.datas[data] = altitudeOcupacao.datas[data].concat(slots);
        } else {
          altitudeOcupacao.datas[data] = slots;
        }
      } else {
        // Se a altitude não foi encontrada, retorna um erro
        throw new Error(`Altitude ${altitude} não encontrada na lista de altitudes disponíveis.`);
      }
    }

    // Escreve o conteúdo no arquivo de ocupacao-aerovia.json
    fs.writeFileSync(filePath, JSON.stringify(ocupacao, null, 2));
    return true;
  }
}

/**
 * Método que verifica se a aerovia está ocupada em uma determinada data, 
 * altitude e slot de tempo inteiro
 * @param {string} idAerovia 
 * @param {string} data - Data no formato DD/MM/AAAA
 * @param {number} altitude - Altitude em pés 35000
 * @param {number} slot - Slot de tempo inteiro (0-23)
 * @param {string} [filePath="./src/data/ocupacao-aerovia.json"] - Caminho do arquivo de ocupação da aerovia - Default: "./src/data/ocupacao-aerovia.json"
 * @returns 
 */
function isOcupado(idAerovia, data, altitude, slot, filePath = "./src/data/ocupacao-aerovia.json") {
  // Valida os argumentos de entrada
  validate(arguments, ["string", "string", "number", "number"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia, filePath);

  // Recupera a ocupação da aerovia
  const ocupacao = recuperaOcupacaoAerovia(aerovia.idAerovia, data, filePath);

  // Verifica se a altitude e o slot estão ocupados para a data informada
  const isDataOcupada = ocupacao.datasOcupadas.some(altitudeOcupada =>
    altitudeOcupada.altitude === altitude &&
    altitudeOcupada.data === data &&
    altitudeOcupada.slots_ocupados.includes(slot)
  )
  // Retorna true se a altitude e o slot estiverem ocupados
  return isDataOcupada
}

// Exporta a função de recuperação de ocupação de aerovia e altitudes livres
export { recuperaOcupacaoAerovia, altitudesLivres, altitudesLivresDataHora, ocupa, isOcupado };