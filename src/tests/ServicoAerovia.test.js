import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Aerovia } from "../classes/Aerovia.js";
import { recupera } from '../servico/ServicoAerovia.js'

describe('Suite de testes ServicoAerovia', () => {

  it("deve um array vazio quando nenhuma aerovia estiver cadastrada", () => {
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
    const aerovia1 = new Aerovia("T1", "GRU", "CKS", 1000);
    const aerovia2 = new Aerovia("T2", "CKS", "FLO", 1000);
    const aerovia3 = new Aerovia("T3", "CKS", "GRU", 1000);

    // Verifica se as aerovias foram cadastradas corretamente e são recuperadas pelo método "recupera".
    assert.deepEqual(recupera("GRU", "CKS"), aerovia1, "Não retornou a aerovia correta.");
    assert.deepEqual(recupera("CKS", "FLO"), aerovia2, "Não retornou a aerovia correta.");
    assert.deepEqual(recupera("CKS", "GRU"), aerovia3, "Não retornou a aerovia correta.");
  });

  // validações do método toString
  it("deve retornar todas as informações de uma aerovia", () => {
    assert.deepEqual(new Aerovia("A-1", "São Paulo", "Rio de Janeiro", 100),
      { id: 'A-1', origem: 'São Paulo', destino: 'Rio de Janeiro', tamanho: 100 },
      "Não retornou as informações corretas.");
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

  // Teste do método toString da classe Aerovia
  it('deve retornar um objeto contendo os dados da aerovia', () => {
    assert.deepEqual(new Aerovia("A-2", "São Paulo", "Rio de Janeiro", 100).toString(),
      { id: 'A-2', origem: 'São Paulo', destino: 'Rio de Janeiro', tamanho: 100 },
      "Não retornou o objeto com os dados da aerovia.");
  })
})