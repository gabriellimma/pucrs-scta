# pucrs-scta
Sistema de Controle de Tráfego Aéreo desenvolvido como projeto final de programação orientada a objetos


## Como baixar e instalar o projeto

Após fazer o download do projeto, será necessário instalar as dependências do mesmo:

```
npm install
```

as depêndencias usadas foram `bycontract` para validação de tipos e `eslint` para validação de padrões de escrita e análise estática de código.

## Arquitetura do projeto

Dentro da pasta `src` você terá acesso as pastas relacionadas com cada contexto, uma pasta para as classes, chamada `classes`, uma pasta para as services, chamada `servico` e uma pasta de testes chamada `tests`.

```
src/
├── classes/
│   ├── Aeronave.js
│   ├── AeronaveCarga.js
│   ├── AeronaveComercial.js
│   ├── AeronaveParticular.js
│   ├── AeronavePassageiros.js
│   └── Piloto.js
├── servico/
│   ├── ServicoAeronaves.js
│   └── ServicoPiloto.js
└── tests/
    ├── ServicoAeronaves.test.js
    └── ServicoPiloto.test.js
```

## Documentação interna e comentários

Para a documentação escolhi um misto de comentários e [JSDoc](https://jsdoc.app/about-getting-started) que é um bom padrão e reconhecido pelo intellisense das principais IDEs, exemplo de jsdoc:

```
/**
 * Classe Aeronave que representa uma aeronave genérica.
 */
class Aeronave
[...]

  /**
   * construtor da superclasse Aeronave
   * @param {string} prefixo 
   * @param {number} velocidadeCruzeiro 
   * @param {number} autonomia 
   */
  constructor(prefixo, velocidadeCruzeiro, autonomia)
  [...]
```

dessa forma, com o uso do JSDoc e do Validate, informamos ao usuário quais são os inputs e outputs de cada função e validamos que os inputs esperados foram enviados com sucesso.

## Como testar a lógica do projeto

Tomei a liberdade de implementar os exemplos de uso das classes de serviço com `testes unitários`, para executar os exemplos de uso execute: 

```
npm test
```

que por sua vez executará o `node test runner` que está nativamente presente desde a versão 20.

você deverá ver algo do tipo no seu terminal:

```
▶ Suite de testes ServicoAeronaves
  ✔ deve um array vazio quando nenhuma nave estiver cadastrada (0.957416ms)
  ✔ deve retornar todas as aeronaves cadastradas (0.5915ms)
  ✔ deve retornar todas as informações de uma aeronave particular (0.128875ms)
  ✔ deve retornar todas as informações de uma aeronave carga (0.11825ms)
  ✔ deve retornar todas as informações de uma aeronave Passageiros (0.09725ms)
▶ Suite de testes ServicoAeronaves (2.73775ms)
▶ Suite de testes ServicoPilotos
  ✔ deve retornar um piloto pela matrícula (0.8215ms)
  ✔ deve lançar um erro ao receber uma matrícula inexistente (0.277417ms)
  ✔ deve retornar todos os pilotos cadastrados (0.230958ms)
  ✔ deve retornar um objeto contendo os dados do piloto (0.095125ms)
▶ Suite de testes ServicoPilotos (2.737833ms)
ℹ tests 9
ℹ suites 2
ℹ pass 9
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 81.066375
ℹ start of coverage report
ℹ ------------------------------------------------------------------------------
ℹ file                              | line % | branch % | funcs % | uncovered …
ℹ ------------------------------------------------------------------------------
ℹ src/classes/Aeronave.js           | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronaveCarga.js      | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronaveComercial.js  | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronaveParticular.js | 100.00 |   100.00 |  100.00 | 
ℹ …c/classes/AeronavePassageiros.js | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/Piloto.js             | 100.00 |   100.00 |  100.00 | 
ℹ src/servico/ServicoPilotos.js     | 100.00 |   100.00 |  100.00 | 
ℹ …c/tests/ServicoAeronaves.test.js | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoPilotos.test.js  | 100.00 |   100.00 |  100.00 | 
ℹ ------------------------------------------------------------------------------
ℹ all files                         | 100.00 |   100.00 |  100.00 |
ℹ ------------------------------------------------------------------------------
ℹ end of coverage report

```

> lembrando que esse projeto foi criado e compilado com node v20.16.0 (LTS), e pode ser necessário a atualização para o node 20 para usar o `node test runner` nativo da ferramenta.