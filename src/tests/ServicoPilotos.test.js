
import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Piloto } from "../classes/Piloto.js";
import { recupera, todos } from '../servico/ServicoPilotos.js'

describe('Suite de testes ServicoPilotos', () => {

  // Criação de pilotos
  const piloto1 = new Piloto("PP-1234", "João", true);
  const piloto2 = new Piloto("PP-5678", "Maria", true);
  const piloto3 = new Piloto("PP-9012", "José", false);
  const piloto4 = new Piloto("PP-3456", "Ana", true);

  // 1. Teste da função recupera
  it('deve retornar um piloto pela matrícula', () => {
    assert.deepEqual(recupera("PP-9012"), piloto3, "Não retornou o piloto correto.");
  })

  // Teste da função recupera com matrícula inexistente
  it("deve lançar um erro ao receber uma matrícula inexistente", () => {

    // Função wrapper para capturar o erro
    function errorThrowingWrapper() {
      recupera('PP-0000');
    }
    // Verifica se o erro foi lançado com a mensagem esperada
    assert.throws(
      errorThrowingWrapper,
      /Error: Piloto não encontrado./,
      "Não lançou o erro esperado com a mensagem correta."
    );
  });

  // 2. Teste da função todos
  it('deve retornar todos os pilotos cadastrados', () => {
    assert.deepEqual(todos(), [piloto1, piloto2, piloto3, piloto4], "Não retornou os pilotos corretos.");
  })

  // Teste de métodos da classe Piloto
  it('deve retornar um objeto contendo os dados do piloto', () => {
    assert.deepEqual(piloto1.toString(), piloto1, "Não retornou o objeto com os dados do piloto.");
  })

})