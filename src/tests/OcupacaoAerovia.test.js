import { recuperaOcupacaoAerovia, altitudesLivres, altitudesLivresDataHora, ocupa } from '../servico/OcupacaoAerovia.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Suite de testes recuperaOcupacaoAerovia', () => {

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

describe('Suite de testes altitudesLivres', () => {

  it("deve retornar um objeto com a altitude, data, e slots desocupados para a data informada", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem datas e slots ocupados para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {}
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    assert.deepEqual(altitudesLivres("T1", "01/01/2022", filePath), [
      {
        altitude: 25000,
        data: "01/01/2022",
        slots_desocupados: [
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
          23,
        ],
      },
    ], "Não retornou as altitudes livres corretamente.");

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("deve retornar um array com apenas as altitudes lives as altitudes livres", () => {
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
          "altitude": 27000,
          "datas": {
            "01/01/2024": [1, 2, 3, 4, 5]
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));
    // valida que os slots desocupados são de uma aerovia sem ocupação é igual a 24
    assert.deepEqual(altitudesLivres("T1", "01/01/2024", filePath), [
      {
        altitude: 27000,
        data: "01/01/2024",
        slots_desocupados: [
          0,
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
        ],
      },
    ], "Não retornou um array com as altitudes lives corretamente.");
    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });
});

describe('Suite de testes altitudesLivresDataHora', () => {

  it("deve retornar um objeto com a altitude, data, e slots desocupados para a data informada", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem datas e slots ocupados para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2022": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    assert.deepEqual(altitudesLivresDataHora("T1", "01/01/2022", 11, filePath).slots_desocupados.length, 24, "Não retornou as altitudes livres corretamente.");

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });
});

describe('Suite de testes ocupa', () => {

  it("deve ocupar os slots da aerovia selecionada", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem datas e slots ocupados para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2022": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    // ocupa os slots da aerovia
    assert.deepEqual(ocupa("T1", "01/01/2022", 25000, [1, 2, 3], filePath), true, "Não foi possível ocupar a aerovia.");

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("deve ocupar os slots da aerovia selecionada mesmo quando a data não existir no objeto", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem datas e slots ocupados para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {}
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    // ocupa os slots da aerovia
    assert.deepEqual(ocupa("T1", "01/01/2022", 25000, [1, 2, 3], filePath), true, "Não foi possível ocupar a aerovia.");

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("deve retornar erro quando os slots a serem ocupados não estão entre 23 e 0", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem datas e slots ocupados para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2022": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    // função que tenta ocupar um slot inválido
    function errorThrowingWrapper() {
      ocupa("T1", "01/01/2022", 25000, [-1], filePath)
    }
    // valida que a função lançou o erro esperado
    assert.throws(
      errorThrowingWrapper,
      /Error: Slot inválido./,
      "Não lançou o erro esperado com a mensagem correta."
    );;

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("tenta ocupar um slot já ocupado previamente e valida a mensagem de erro", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto sem datas e slots ocupados para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2022": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    // criei variáveis para facilitar a leitura e usabilidade do teste, que se tornará dinamico
    const idAerovia = "T1"
    const dataOcupacao = "01/01/2022"
    const slotsOcupados = [1, 2, 3]
    const altitude = 25000

    // cria uma mensagem de erro esperada
    const errorMessage = `Slot ${slotsOcupados[0]}, da aerovia ${idAerovia} já está ocupado na data ${dataOcupacao} para a altitude ${altitude}`;
    // cria uma expressão regular para validar a mensagem de erro
    const errMessageRegex = new RegExp(errorMessage);

    // ocupa o slot pela primeira vez
    ocupa(idAerovia, dataOcupacao, altitude, slotsOcupados, filePath)

    // função que tenta ocupar um slot já ocupado
    function errorThrowingWrapper() {
      ocupa(idAerovia, dataOcupacao, altitude, slotsOcupados, filePath)
    }

    // valida que a função lançou o erro esperado
    assert.throws(
      errorThrowingWrapper,
      errMessageRegex,
      "Não lançou o erro esperado com a mensagem correta."
    );;

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("valida que ao tentar ocupar uma slot em uma altitude inexistente o programa devolve uma mensagem de erro", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto com apenas uma aerovia e uma altitude para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2022": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    // criei variáveis para facilitar a leitura e usabilidade do teste, que se tornará dinamico
    const idAerovia = "T1"
    const dataOcupacao = "01/01/2022"
    const slotsOcupados = [1, 2, 3]
    const altitude = 29000

    // cria uma mensagem de erro esperada
    const errorMessage = `Altitude ${altitude} não encontrada na lista de altitudes disponíveis.`;
    // cria uma expressão regular para validar a mensagem de erro
    const errMessageRegex = new RegExp(errorMessage);

    // função que tenta ocupar uma aerovia em uma altitude inexistente
    function errorThrowingWrapper() {
      ocupa(idAerovia, dataOcupacao, altitude, slotsOcupados, filePath)
    }

    // valida que a função lançou o erro esperado
    assert.throws(
      errorThrowingWrapper,
      errMessageRegex,
      "Não lançou o erro esperado com a mensagem correta."
    );;

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it("valida que ao tentar ocupar uma aerovia inexistente o programa devolve uma mensagem de erro", () => {
    // configuração do arquivo de teste
    const nomeArquivo = "ocupacao-aerovia-test.json";
    const dir = path.resolve("./src/data/aerovia-test");
    const filePath = path.join(dir, nomeArquivo);
    fs.mkdirSync(dir, { recursive: true });
    // cria um objeto com apenas uma aerovia e uma altitude para o teste
    const testObject = [{
      "idAerovia": "T1",
      "altitudes": [
        {
          "altitude": 25000,
          "datas": {
            "01/01/2022": []
          }
        }
      ]
    }]
    // cria o arquivo ocupacao-aerovia-test.json como o objeto de teste de ocupação de aerovia
    fs.writeFileSync(filePath, JSON.stringify(testObject, null, 2));

    // criei variáveis para facilitar a leitura e usabilidade do teste, que se tornará dinamico
    const idAerovia = "T99" // aerovia inexistente
    const dataOcupacao = "01/01/2022"
    const slotsOcupados = [1, 2, 3]
    const altitude = 29000

    // cria uma mensagem de erro esperada
    const errorMessage = `Aerovia ID:${idAerovia} não encontrada na lista de aerovias disponíveis.`;
    // cria uma expressão regular para validar a mensagem de erro
    const errMessageRegex = new RegExp(errorMessage);

    // função que tenta ocupar uma aerovia em uma altitude inexistente
    function errorThrowingWrapper() {
      ocupa(idAerovia, dataOcupacao, altitude, slotsOcupados, filePath)
    }

    // valida que a função lançou o erro esperado
    assert.throws(
      errorThrowingWrapper,
      errMessageRegex,
      "Não lançou o erro esperado com a mensagem correta."
    );;

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });
});