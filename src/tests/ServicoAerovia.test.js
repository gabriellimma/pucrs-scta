import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Aerovia } from "../classes/Aerovia.js";
import { recupera, recuperaAeroviaPorID } from '../servico/ServicoAerovia.js'

describe('Suite de testes ServicoAerovia', () => {

  it("deve retornar um array vazio quando nenhuma aerovia estiver cadastrada", () => {
    assert.deepEqual(Aerovia.todas(), [], "Não retornou as aerovias corretas.");
  });

  // 1. Teste da função "todas" que retorna todas as aerovias cadastradas
  it("deve retornar todas as aerovias cadastradas", () => {
    // Criação de aerovias
    const aerovia1 = new Aerovia("R1", "POA", "FLO", 1000);
    const aerovia2 = new Aerovia("R2", "POA", "GRU", 200);
    const aerovia3 = new Aerovia("R3", "GRU", "POA", 300);
    const aerovia4 = new Aerovia("R4", "FLO", "CWB", 400);
    const aerovia5 = new Aerovia("R5", "CWB", "FLO", 400);

    // Verifica se as aerovias foram cadastradas corretamente e são recuperadas pelo método "todas".
    assert.deepEqual(Aerovia.todas(), [aerovia1, aerovia2, aerovia3, aerovia4, aerovia5], "Não retornou as aerovias corretas.");
  });

  // 2. Teste da função "recupera" que retorna uma aerovia pela origem e destino
  it("deve retornar uma aerovia pela sua origem e destino", () => {

    // Criação de aerovias
    const aerovia1 = new Aerovia("R6", "CWB", "GRU", 4000);
    const aerovia2 = new Aerovia("R7", "GRU", "CWB", 7000);
    const aerovia3 = new Aerovia("R8", "FLO", "POA", 400);

    // Verifica se as aerovias foram cadastradas corretamente e são recuperadas pelo método "recupera".
    assert.deepEqual(recupera("CWB", "GRU"), aerovia1, "Não retornou a aerovia correta.");
    assert.deepEqual(recupera("GRU", "CWB"), aerovia2, "Não retornou a aerovia correta.");
    assert.deepEqual(recupera("FLO", "POA"), aerovia3, "Não retornou a aerovia correta.");
  });

  // validações do método toString
  it("deve retornar todas as informações de uma aerovia", () => {
    assert.deepEqual(new Aerovia("A-1", "São Paulo", "Rio de Janeiro", 100),
      { idAerovia: 'A-1', origem: 'São Paulo', destino: 'Rio de Janeiro', tamanho: 100 },
      "Não retornou as informações corretas.");
  })

  // Teste da função recupera através do id da aerovia
  it('deve retornar um objeto de aerovia através do seu id', () => {
    assert.deepEqual(recuperaAeroviaPorID('R7'),
      {
        "idAerovia": "R7",
        "origem": "GRU",
        "destino": "CWB",
        "tamanho": 7000
      },
      "Não retornou o objeto com os dados da aerovia.");
  })

  // Teste da função recupera com origem e destino inexistente
  it("deve lançar um erro ao receber uma origem e destino inexistente", () => {

    // Função wrapper para capturar o erro
    function errorThrowingWrapper() {
      recupera('POA', 'XXX');
    }
    // Verifica se o erro foi lançado com a mensagem esperada
    assert.throws(
      errorThrowingWrapper,
      /Error: Aerovia não encontrada./,
      "Não lançou o erro esperado com a mensagem correta."
    );
  });


  // Teste da função recupera com origem e destino inexistente pelo ID
  it("deve lançar um erro ao receber um id de aerovia inexistente", () => {

    const idAerovia = 'XXX';
    // cria uma mensagem de erro esperada
    const errorMessage = `Aerovia ID:${idAerovia} não encontrada na lista de aerovias disponíveis.`;
    // cria uma expressão regular para validar a mensagem de erro
    const errMessageRegex = new RegExp(errorMessage);

    // Função wrapper para capturar o erro
    function errorThrowingWrapper() {
      recuperaAeroviaPorID(idAerovia);
    }
    // Verifica se o erro foi lançado com a mensagem esperada
    assert.throws(
      errorThrowingWrapper,
      errMessageRegex,
      "Não lançou o erro esperado com a mensagem correta."
    );
  });

  // Teste do método toString da classe Aerovia
  it('deve retornar um objeto contendo os dados da aerovia', () => {
    assert.deepEqual(new Aerovia("A-2", "São Paulo", "Rio de Janeiro", 100).toString(),
      { idAerovia: 'A-2', origem: 'São Paulo', destino: 'Rio de Janeiro', tamanho: 100 },
      "Não retornou o objeto com os dados da aerovia.");
  })


})