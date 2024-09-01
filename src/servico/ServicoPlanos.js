import { validate } from "bycontract";
import { PlanoDeVoo } from "../classes/PlanoDeVoo.js";
import fs from "fs";
import path from "path";

globalThis.PlanoDeVoo = PlanoDeVoo;

/**
 * Função que salva um plano de voo em um arquivo no formato JSON.
 * @param {PlanoDeVoo} planoDeVoo 
 * @param {string} [nomeArquivo="planos_de_voo.json"] opcional
 * @param {string} [diretorio="./src/data"] opcional
 */
function consiste(planoDeVoo, nomeArquivo = "planos_de_voo.json", diretorio = "./src/data") {
  // valida os argumentos
  validate(arguments, ["PlanoDeVoo"]);
  
  // define o diretório e normaliza o caminho do arquivo de planos de voo
  const dir = path.resolve(diretorio);
  const filePath = path.join(dir, nomeArquivo);

  // valida se o diretório existe
  if (!fs.existsSync(dir)) {
    // se não, cria o diretório
    fs.mkdirSync(dir, { recursive: true });
    // cria o arquivo de planos de voo como um array vazio para ser populado posteriormente
    fs.writeFileSync(filePath, "[]");
  }

  // lê o conteúdo existente do arquivo de planos de voo e transforma em um array
  let existingContent = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent) {
      existingContent = JSON.parse(fileContent);
    }
  }

  // se houver planos de voo cadastrados
 if(existingContent.length > 0) {
  // adiciona o id ao plano de voo de acordo com o último id cadastrado no arquivo
    planoDeVoo.id = existingContent[existingContent.length -1].id + 1;
 } else {
  // se não houver planos de voo cadastrados, o id do plano de voo é 1
    planoDeVoo.id = 1;
 }

  // adiciona o plano de voo ao conteúdo existente
  existingContent.push(planoDeVoo);

  // grava o plano de voo no arquivo de planos de voo
  fs.writeFileSync(filePath, JSON.stringify(existingContent, null, 2));
}

/**
 * função que acessa o aruvo de planos de voos cadastrados e recupera um plano pelo ID.
 * @param {Number} id
 * @param {string} [nomeArquivo="planos_de_voo.json"] opcional
 * @param {string} [diretorio="./src/data/"] opcional
 * @returns 
 */
function recupera(id, nomeArquivo = "planos_de_voo.json", diretorio = "./src/data/") {
  // valida os argumentos 
  validate(arguments, ["number"]);

  // recupera os planos de voo cadastrados no arquivo como json
  const listaPlanos = JSON.parse(fs.readFileSync(path.resolve(`${diretorio}${nomeArquivo}`), "utf-8"));

  // recupera o plano de voo pelo id
  const plano = listaPlanos.find(p => p.id === id);
  // se não encontrar o plano de voo, lança uma exceção
  if (!plano) {
    throw new Error("Plano de voo não encontrado.");
  }
  // retorna o plano de voo se existir
  return plano;
}

export { consiste, recupera };