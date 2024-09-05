import { validate } from 'bycontract';
import fs from 'fs';
import path from 'path';

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

  // Exibir a lista de aerovias filtradas
  console.log(`Aerovias de ${origem} para ${destino}:`);
  aeroviasFiltradas.forEach(aerovia => {
    const objListaAerovias = {
      id: aerovia.id,
      tamanho: aerovia.tamanho,
      origem: aerovia.origem,
      destino: aerovia.destino
    }
    console.log(objListaAerovias);
  });
}

// Exemplo de uso listarAeroviasEntreAeroportos\
const aeroportoOrigem = 'POA';
const aeroportoDestino = 'GRU';

/*Exemplo de uso 1:
Listar as aerovias existentes entre dois aeroportos.
o Deve apresentar na tela a lista de todas as aerovias 
que partem do aeroporto A para o aeroporto B. 
*/
listarAeroviasEntreAeroportos(aeroportoOrigem, aeroportoDestino);
/*
  Exemplo de saída:
  { id: 'R2', tamanho: 2000, origem: 'POA', destino: 'GRU' }
  { id: 'R9', tamanho: 400, origem: 'POA', destino: 'GRU' }
*/

function listarAltitudes() {

}

function aprovarPlanoDeVoo() {

}

function listarPlano() {

}