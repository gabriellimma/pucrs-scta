import { recuperaOcupacaoAerovia, altitudesLivres, altitudesLivresDataHora } from '../servico/OcupacaoAerovia.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Suite de testes OcupacaoAerovia', () => {

  it("deve retornar um objeto vazio quando nenhuma aerovia estiver ocupada", () => {
    assert.deepEqual(recuperaOcupacaoAerovia("1", "01/01/2022"), { datasOcupadas: [], aeroviasLivres: [] }, "Não retornou as aerovias corretas.");
  });

  it("deve retornar 24 slots desocupados para uma data sem ocupação definida", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem ocupação de aerovia para uma data específica para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2024": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));
    // guarda o resultado da função de recuperação de ocupação de aerovia
    const aeroviasLivres = recuperaOcupacaoAerovia("T1", "01/01/2024", filePath).aeroviasLivres
    // valida que os slots desocupados são de uma aerovia sem ocupação é igual a 24
    assert.deepEqual(aeroviasLivres[0].slots_desocupados.length, 24, "Não retornou as altitudes corretas.");
    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("deve retornar 10 slots ocupados para uma data com 10 ocupações definidas", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem ocupação de aerovia para uma data específica para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2024": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));
    // guarda o resultado da função de recuperação de ocupação de aerovia
    const aeroviasLivres = recuperaOcupacaoAerovia("T1", "01/01/2024", filePath)
    // valida que os slots ocupados no testObject são iguais aos slots ocupados na função de recuperação de ocupação de aerovia
    assert.deepEqual(aeroviasLivres.datasOcupadas[0].slots_ocupados, testObject[0].altitudes[0].datas['01/01/2024'], "Não os slots de ocupação corretamente corretas.");
    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("deve retornar 24 slots desocupados para uma não cadastrada", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem ocupação de aerovia para uma data específica para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2024": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));
    // guarda o resultado da função de recuperação de ocupação de aerovia
    const aeroviasLivres = recuperaOcupacaoAerovia("T1", "02/01/2024", filePath)
    // valida que os slots ocupados no testObject são iguais aos slots ocupados na função de recuperação de ocupação de aerovia
    assert.deepEqual(aeroviasLivres.aeroviasLivres[0].slots_desocupados.length, 24, "Não os slots de ocupação corretamente corretas.");
    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

});