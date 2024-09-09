import { validate } from 'bycontract';
import fs from 'fs';
import path from 'path';
import { altitudesLivresDataHora, ocupa } from '../servico/OcupacaoAerovia.js';
import { PlanoDeVoo } from '../classes/PlanoDeVoo.js';
import { recupera as recuperaPilotos } from '../servico/ServicoPilotos.js';
import { AeronaveCarga } from '../classes/AeronaveCarga.js';
import { AeronaveParticular } from '../classes/AeronaveParticular.js';
import { AeronavePassageiros } from '../classes/AeronavePassageiros.js';
import { recuperaAeroviaPorID } from '../servico/ServicoAerovia.js';
import { Aeronave } from '../classes/Aeronave.js';
import { consiste, recupera } from '../servico/ServicoPlanos.js';

globalThis.PlanoDeVoo = PlanoDeVoo;
globalThis.Aeronave = Aeronave;

/**
 * Método que valida se uma aeronave pode voar
 * por uma determinada aerovia de acordo com a sua
 * autonomia.
 * @param {Aeronave} aeronave 
 * @param {number} tamanhoAerovia 
 * @returns {boolean}
 */
function calculaAutonomia(aeronave, tamanhoAerovia) {
  validate(arguments, ["Aeronave", "number"]);

  // Verifica se a autonomia total é pelo menos 10% maior que o tamanho da aerovia
  if (aeronave.autonomia < (tamanhoAerovia * 1.1)) {
    throw new Error("A autonomia da aeronave deve ser pelo menos 10% maior que o tamanho da aerovia.");
  }
  return true
}

/**
 * Método que estima a quantidade de horas de voo
 * @param {string} idAerovia 
 * @param {number} velocidadeCruzeiroAeronave 
 * @param {number} horaInicio - Hora de início do voo [0-23]
 * @returns {Object} {slotsNecessarios: number, horaChegada: number, slotsOcupados: number[]}
 */
function estimaHorasVoo(idAerovia, velocidadeCruzeiroAeronave, horaInicio) {

  // Valida os argumentos de entrada
  validate(arguments, ["string", "number", "number"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia);

  // Calcula o tempo de viagem
  const tempoViajem = aerovia.tamanho / velocidadeCruzeiroAeronave;

  let slotsOcupados = [];

  for (let i = horaInicio; i <= Math.ceil(tempoViajem + horaInicio); i++) {
    // definição da variavel temporaria slot
    let slot = i;

    // se o slot for maior que 23, ele volta para 0 (meia noite)
    if (i > 23) {
      slot = i - 24;
    }
    // adiciona o slot ao array de slots ocupados
    slotsOcupados.push(slot);
  }

  // Retorna a quantidade de slots necessários, hora de chegada e slots ocupados
  return {
    slotsNecessarios: Math.ceil(tempoViajem),
    horaChegada: horaInicio + Math.ceil(tempoViajem),
    slotsOcupados: [...slotsOcupados]
  }
}

/**
 * Método que valida segundo a lógica da especificação se a nave pode voar
 * @param {Aeronave} aeronave 
 * @param {string} idAerovia 
 * @param {number} altitude 
 * @param {number} hora início do voo [0-23] 
 * @returns 
 */
function validaAeronavePodeVoar(aeronave, idAerovia, altitude, horaInicio) {

  // Valida os argumentos de entrada
  validate(arguments, ["Aeronave", "string", "number", "number"]);

  // Recupera a aerovia pelo ID
  const aerovia = recuperaAeroviaPorID(idAerovia);

  // Calcula a autonomia da aeronave
  calculaAutonomia(aeronave, aerovia.tamanho);

  // Verifica se a aeronave de carga cumpre os requisitos para voar
  if (aeronave instanceof AeronaveCarga) {
    // Verifica se a aeronave de carga pode voar entre 0 e 6 da manhã
    const estimativaHorasVoo = estimaHorasVoo(idAerovia, aeronave.velocidadeCruzeiro, horaInicio);

    // Verifica se a aeronave de carga pode voar entre 0 e 6 da manhã comparando os valores encontrados pelo find
    // com os valores necessários para o voo, exemplo: se o slotsOcupados for [23, 0, 1] o filter vai retornar [0, 1]
    // e o length vai ser igual a 2. Então o comparamos com o length do slotsOcupados, como não vai ser igual por possuir
    // o valor 23, ele vai retornar false e lançar a exceção.
    if (estimativaHorasVoo.slotsOcupados.filter(slot => slot >= 0 && slot <= 6).length == estimativaHorasVoo.slotsOcupados.length) {
      return true
    } else {
      throw new Error("A aeronave de carga só pode voar entre 0 e 6 da manhã.");
    }
  }

  // Verifica se a aeronave particular cumpre os requisitos para voar
  if (aeronave instanceof AeronaveParticular) {
    if (altitude >= 25000 && altitude <= 28000) {
      return true
    } else {
      throw new Error("A aeronave particular só pode voar entre 25000 e 28000 pés.");
    }
  }

  // Verifica se a aeronave de passageiros cumpre os requisitos para voar
  if (aeronave instanceof AeronavePassageiros) {
    if (altitude > 28000) {
      return true
    } else {
      throw new Error("A aeronave de passageiros só pode voar acima de 28000 pés.");
    }
  }
  return false;
}

/**
 * Método que lista as aerovias existentes entre dois aeroportos.
 * @param {string} origem 
 * @param {string} destino 
 */
function listarAeroviasEntreAeroportos(origem, destino) {

  validate(arguments, ["string", "string"]);

  const nomeArquivo = "aerovias.json";
  const dir = path.resolve("./src/data");
  const filePath = path.join(dir, nomeArquivo);
  const data = fs.readFileSync(filePath, 'utf8');

  // Converter o conteúdo do arquivo para um objeto JavaScript
  const aerovias = JSON.parse(data);

  // Filtrar as aerovias que partem do aeroporto de origem para o aeroporto de destino
  const aeroviasFiltradas = aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino === destino);

  // Objeto que armazena as informações das aerovias
  let objListaAerovias = {};

  // Exibir a lista de aerovias filtradas
  aeroviasFiltradas.forEach(aerovia => {
    objListaAerovias = {
      id: aerovia.idAerovia,
      tamanho: aerovia.tamanho,
      origem: aerovia.origem,
      destino: aerovia.destino
    };
  });

  return objListaAerovias;
}

// Exemplo de uso listarAeroviasEntreAeroportos\
const aeroportoOrigem = 'POA';
const aeroportoDestino = 'GRU';

/*Exemplo de uso 1:
Listar as aerovias existentes entre dois aeroportos.
o Deve apresentar na tela a lista de todas as aerovias 
que partem do aeroporto A para o aeroporto B. 
*/
console.log("\nExemplo de uso listarAeroviasEntreAeroportos")
console.log(listarAeroviasEntreAeroportos(aeroportoOrigem, aeroportoDestino));
console.log("----------------------------------------------")

/*
  Exemplo de saída:
  { id: 'R2', tamanho: 2000, origem: 'POA', destino: 'GRU' }
  { id: 'R9', tamanho: 400, origem: 'POA', destino: 'GRU' }
*/

/**
 * Método que lista as altitudes disponíveis para um plano de voo.
 * @param {string} origem 
 * @param {string} destino 
 * @param {string} data DD/MM/AAAA
 * @param {number} hora - Hora do plano de voo (0-23)
 * @returns 
 */
function listarAltitudes(origem, destino, data, hora) {

  // Validar os argumentos
  validate(arguments, ["string", "string", "string", "number"]);

  // Obter o id da aerovia
  const idAerovia = listarAeroviasEntreAeroportos(origem, destino).id;

  // Obter as altitudes livres para a data e hora informadas
  return altitudesLivresDataHora(idAerovia, data, hora);
}

// Exemplo de uso listarAltitudes
console.log("\nExemplo de uso listarAltitudes")
console.log(listarAltitudes('POA', 'GRU', '01/09/2024', 3))
console.log("----------------------------------------------")
/*
  nesse exemplo, como o slot das 3 horas da data 01/09/2024 está ocupado,
  a função não retorna a altitude cujo slot está ocupado, apenas altitudes
  que permitem alocar um plano de voo para a data e hora informada.
*/

/**
 * Método que aprova um plano de voo e consiste o plano de voo
 * no sistema.
 * @param {PlanoDeVoo} planoDeVoo 
 * @param {Aeronave} aeronave 
 */
function aprovarPlanoDeVoo(planoDeVoo, aeronave) {

  // Validar os argumentos
  validate(arguments, ["PlanoDeVoo"]);

  let isPilotoHabilitado = false;
  let isAeronavePermitida = false;
  let isAltitudeDisponivel = false;

  // Verificar se o piloto existe e tem habilitação ativa
  if (recuperaPilotos(planoDeVoo.matriculaPiloto).habilitacaoAtiva) {
    isPilotoHabilitado = true;
  } else {
    throw new Error("O piloto não tem habilitação ativa, não foi possível aprovar o plano de voo.");
  }

  // Verifica se a aeronave pode voar
  if (validaAeronavePodeVoar(aeronave, planoDeVoo.idAerovia, planoDeVoo.altitude, planoDeVoo.slots[0])) {
    isAeronavePermitida = true;
  }

  const aeroviaTemp = recuperaAeroviaPorID(planoDeVoo.idAerovia);
  const listaAltitudesDisponiveis = listarAltitudes(aeroviaTemp.origem, aeroviaTemp.destino, planoDeVoo.data, planoDeVoo.slots[0]);

  // Verifica se a altitude está disponível
  if (listaAltitudesDisponiveis.slots_desocupados.length > 0) {
    // Verifica se a altitude está disponível

    for (let i = 0; i < planoDeVoo.slots.length; i++) {
      if (!listaAltitudesDisponiveis.slots_desocupados.includes(planoDeVoo.slots[i])) {
        isAltitudeDisponivel = false;
      } else {
        isAltitudeDisponivel = true;
      }
    }
  }
  // Se todas as condições forem verdadeiras, o plano de voo é aprovado
  if (isPilotoHabilitado && isAeronavePermitida && isAltitudeDisponivel) {

    const slotsNecessariosVoo = estimaHorasVoo(planoDeVoo.idAerovia, aeronave.velocidadeCruzeiro, planoDeVoo.slots[0]).slotsOcupados;
    //ocupa os slots de tempo da aerovia
    ocupa(planoDeVoo.idAerovia, planoDeVoo.data, planoDeVoo.altitude, slotsNecessariosVoo);

    // consiste o plano de voo
    consiste(planoDeVoo);
  } else {
    throw new Error("O plano de voo não pode ser aprovado.");
  }

}

/**
 * Método que usa a função "recupera" para recuperar um plano de voo pelo ID.
 * @param {number} id 
 * @returns 
 */
function listarPlano(id) {

  // Validar os argumentos
  validate(arguments, ["number"]);
  // recupera o plano de voo pelo id
  return recupera(id);
}

let a1 = new AeronaveParticular('Particular1', 1200, 28000, "MCarthy Flights");
let a2 = new AeronaveCarga('Cargo1', 1000, 50000, "Correios", 5000);
let p1 = new PlanoDeVoo('456', 'R2', '01/09/2024', "18:00", 25000, [0, 1, 2], false);

//exemplo listarPlano
console.log("\nExemplo de uso listarPlano por ID")
console.log(listarPlano(1));
console.log("----------------------------------------------")

// Exemplo de uso aprovarPlanoDeVoo
//aprovarPlanoDeVoo(p1, a1);
