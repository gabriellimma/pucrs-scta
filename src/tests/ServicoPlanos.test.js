import { describe, it } from 'node:test';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { PlanoDeVoo } from '../classes/PlanoDeVoo.js';
import { consiste, recupera } from '../servico/ServicoPlanos.js';

describe('Suite de testes ServicoPlanos', () => {

  it('deve criar um novo diretório de plano de voo se o diretório não existir', () => {
    // configuração do plano de voo
    const planoDeVoo = new PlanoDeVoo("PP-TEST1", "AER-TEST", "2021-10-10", "10:00", "UTC", 10000, [1, 2, 3], false);
    // configuração do caminho do diretório do arquivo de teste
    const nomeArquivo = "planos_de_voo_test.json";
    const dir = path.resolve("./src/data/testdir");

    // execução da função consiste
    consiste(planoDeVoo, nomeArquivo, dir);

    // valida se o diretório de teste foi criado com sucesso
    assert.strictEqual(fs.existsSync(dir), true);

    // limpeza do diretório de teste desabilitando a cobertura de código para funções de deleção de diretórios
    /* node:coverage disable */
    fs.rmSync(dir, { recursive: true });
    /* node:coverage enable */
  });

  it('deve criar um novo arquivo de plano de voo se o arquivo não existir', () => {
    // configuração do plano de voo
    const planoDeVoo = new PlanoDeVoo("PP-TEST2", "AER-TEST", "2021-10-10", "10:00", "UTC", 10000, [1, 2, 3], false);
    // configuração do caminho do diretório do arquivo de teste
    const nomeArquivo = "planos_de_voo_test.json";
    const dir = path.resolve("./src/data");
    const filePath = path.join(dir, nomeArquivo);

    // execução da função consiste
    consiste(planoDeVoo, nomeArquivo);

    // valida se o arquivo de teste foi criado com sucesso
    assert.strictEqual(fs.existsSync(filePath), true);

    // deleção do arquivo de teste
    /* node:coverage disable */
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log('arquivo deletado com sucesso!');
    });
    /* node:coverage enable */
  });

  it('valida que o id do terceiro objeto criado na terceira invocação da função "consiste" é 3', () => {
    // configuração do plano de voo
    const pv1 = new PlanoDeVoo("PP-TEST1", "AER-TEST1", "2021-10-10", "10:00", "UTC", 10000, [1, 2, 3], false);
    const pv2 = new PlanoDeVoo("PP-TEST2", "AER-TEST2", "2021-10-10", "10:00", "UTC", 10000, [4, 5, 6], false);
    const pv3 = new PlanoDeVoo("PP-TEST3", "AER-TEST3", "2021-10-10", "10:00", "UTC", 10000, [7, 8, 9], true);


    // configuração do caminho do diretório do arquivo de teste
    const nomeArquivo = "planos_de_voo_test.json";
    const dir = path.resolve("./src/data");
    const filePath = path.join(dir, nomeArquivo);

    // execução da função consiste
    consiste(pv1, nomeArquivo);
    consiste(pv2, nomeArquivo);
    consiste(pv3, nomeArquivo);

    // valida se o arquivo de teste foi criado com sucesso
    const planoRecuperado = recupera(3, nomeArquivo);
    assert.strictEqual(planoRecuperado.id, pv3.id);

    // deleção do arquivo de teste
    /* node:coverage disable */
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log('arquivo deletado com sucesso!');
    });
    /* node:coverage enable */
  });

  it('valida que o método toString() da classe retorna um objeto com todas as propriedades do objeto PlanoDeVoo', () => {
    // configuração do plano de voo
    const planoDeVoo = new PlanoDeVoo("PP-TEST", "AER-TEST", "2021-10-10", "10:00", "UTC", 10000, [1, 2, 3], false);

    // execução do método toString da classe PlanoDeVoo criada acima e comparação com o objeto esperado
    assert.deepEqual(planoDeVoo.toString(), {
      id: (PlanoDeVoo.id - 1),
      matriculaPiloto: "PP-TEST",
      idAerovia: "AER-TEST",
      data: "2021-10-10",
      hora: "10:00",
      horario: "UTC",
      altitude: 10000,
      slots: [1, 2, 3],
      cancelado: false
    });
  });

  it('valida que ao tentar encontrar um plano de voo inexistente o programa retorna um erro', () => {
    // configuração do plano de voo
    const planoDeVoo = new PlanoDeVoo("PP-TEST2", "AER-TEST", "2021-10-10", "10:00", "UTC", 10000, [1, 2, 3], false);
    // configuração do caminho do diretório do arquivo de teste
    const nomeArquivo = "planos_de_voo_test.json";
    const dir = path.resolve("./src/data");
    const filePath = path.join(dir, nomeArquivo);

    // execução da função consiste para o plano de voo criado acima
    consiste(planoDeVoo, nomeArquivo);

    // valida se ao tentar recuperar um plano de voo inexistente, um erro é lançado
    assert.throws(
      () => {
        recupera(3, nomeArquivo);
      },
      /Error: Plano de voo não encontrado./,
      "Não lançou o erro esperado com a mensagem correta."
    );

    // deleção do arquivo de teste
    /* node:coverage disable */
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log('arquivo deletado com sucesso!');
    });
    /* node:coverage enable */
  });
});