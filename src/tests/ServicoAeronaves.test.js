import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Aeronave } from "../classes/Aeronave.js";
import { AeronaveParticular } from "../classes/AeronaveParticular.js";
import { AeronaveComercial } from "../classes/AeronaveComercial.js";
import { AeronavePassageiros } from "../classes/AeronavePassageiros.js";
import { AeronaveCarga } from "../classes/AeronaveCarga.js";

describe('Suite de testes ServicoAeronaves', () => {

  it("deve retornar um array vazio quando nenhuma nave estiver cadastrada", () => {
    assert.deepEqual(Aeronave.todas(), [], "Não retornou as aeronaves corretas.");
  });

  // 1. Teste da função "todas" que retorna todas as aeronaves cadastradas
  it("deve retornar todas as aeronaves cadastradas", () => {
    // Criação de aeronaves
    const aeronave1 = new AeronaveParticular("PP-1234", 300, 1000, "João");
    const aeronave2 = new AeronaveComercial("PP-5678", 500, 2000, "Gol");
    const aeronave3 = new AeronavePassageiros("PP-9012", 700, 3000, "Latam", 200);
    const aeronave4 = new AeronaveCarga("PP-3456", 900, 4000, "Azul", 300);

    // Verifica se as aeronaves foram cadastradas corretamente e são recuperadas pelo método "todas".
    assert.deepEqual(Aeronave.todas(), [aeronave1, aeronave2, aeronave3, aeronave4], "Não retornou as aeronaves corretas.");
  });

  // validações dos métodos toString
  it("deve retornar todas as informações de uma aeronave particular", () => {
    assert.deepEqual(new AeronaveParticular("PP-1234", 300, 1000, "João").toString(),
      { prefixo: 'PP-1234', velocidadeCruzeiro: 300, autonomia: 1000, respManutencao: 'João' },
      "Não retornou as informações corretas.");
  })

  it("deve retornar todas as informações de uma aeronave carga", () => {
    assert.deepEqual(new AeronaveCarga("PP-1111", 400, 1000, "Latam", 500).toString(),
      { prefixo: 'PP-1111', velocidadeCruzeiro: 400, autonomia: 1000, nomeCIA: 'Latam', pesoMax: 500 },
      "Não retornou as informações corretas.");
  })

  it("deve retornar todas as informações de uma aeronave Passageiros", () => {
    assert.deepEqual(new AeronavePassageiros("PP-4444", 600, 60000, "Air France", 400).toString(),
      { prefixo: 'PP-4444', velocidadeCruzeiro: 600, autonomia: 60000, nomeCIA: 'Air France', maxPassageiros: 400 },
      "Não retornou as informações corretas.");
  })

})