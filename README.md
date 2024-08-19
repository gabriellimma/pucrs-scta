# pucrs-scta
Sistema de Controle de Tráfego Aéreo desenvolvido como projeto final de programação orientada a objetos

## Como baixar e instalar o projeto

Após fazer o download do projeto e verificar que você tem uma versão do [node > 20 instalada](https://nodejs.org/en), será necessário instalar as dependências do projeto:

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
│   ├── Aerovia.js
│   └── Piloto.js
├── servico/
│   ├── ServicoAeronaves.js
│   ├── ServicoAerovia.js
│   └── ServicoPiloto.js
└── tests/
    ├── ServicoAeronaves.test.js
    ├── ServicoAerovia.test.js
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
  ✔ deve retornar um array vazio quando nenhuma nave estiver cadastrada (1.384917ms)
  ✔ deve retornar todas as aeronaves cadastradas (0.628042ms)
  ✔ deve retornar todas as informações de uma aeronave particular (0.13525ms)
  ✔ deve retornar todas as informações de uma aeronave carga (0.123458ms)
  ✔ deve retornar todas as informações de uma aeronave Passageiros (0.100208ms)
▶ Suite de testes ServicoAeronaves (3.223ms)
▶ Suite de testes ServicoAerovia
  ✔ deve retornar um array vazio quando nenhuma aerovia estiver cadastrada (1.437542ms)
  ✔ deve retornar todas as aerovias cadastradas (0.517791ms)
  ✔ deve retornar uma aerovia pela sua origem e destino (0.1475ms)
  ✔ deve retornar todas as informações de uma aerovia (0.100917ms)
  ✔ deve lançar um erro ao receber uma origem e destino inexistente (0.269916ms)
  ✔ deve retornar um objeto contendo os dados da aerovia (0.08825ms)
▶ Suite de testes ServicoAerovia (3.43675ms)
▶ Suite de testes ServicoPilotos
  ✔ deve retornar um piloto pela matrícula (1.711375ms)
  ✔ deve lançar um erro ao receber uma matrícula inexistente (0.319208ms)
  ✔ deve retornar todos os pilotos cadastrados (0.2505ms)
  ✔ deve retornar um objeto contendo os dados do piloto (0.103125ms)
▶ Suite de testes ServicoPilotos (3.229667ms)
ℹ tests 15
ℹ suites 3
ℹ pass 15
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 80.434584
ℹ start of coverage report
ℹ -----------------------------------------------------------------------------------
ℹ file                               | line % | branch % | funcs % | uncovered lines
ℹ -----------------------------------------------------------------------------------
ℹ src/classes/Aeronave.js            | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronaveCarga.js       | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronaveComercial.js   | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronaveParticular.js  | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/AeronavePassageiros.js | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/Aerovia.js             | 100.00 |   100.00 |  100.00 | 
ℹ src/classes/Piloto.js              | 100.00 |   100.00 |  100.00 | 
ℹ src/servico/ServicoAerovia.js      | 100.00 |   100.00 |  100.00 | 
ℹ src/servico/ServicoPilotos.js      | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoAeronaves.test.js | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoAerovia.test.js   | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoPilotos.test.js   | 100.00 |   100.00 |  100.00 | 
ℹ -----------------------------------------------------------------------------------
ℹ all files                          | 100.00 |   100.00 |  100.00 |
ℹ -----------------------------------------------------------------------------------
ℹ end of coverage report
```

> lembrando que esse projeto foi criado e compilado com node v20.16.0 (LTS), e pode ser necessário a atualização para o node 20 para usar o `node test runner` nativo da ferramenta.