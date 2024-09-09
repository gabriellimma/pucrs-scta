# pucrs-scta
Sistema de Controle de Tráfego Aéreo desenvolvido como projeto final de programação orientada a objetos. Para mais informações e uma descrição rápida do projeto, [você pode assistir esse vídeo.](https://youtu.be/kc-XbaeGII4)

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
├──app/
├── Sistema.js
├── classes/
│   ├── Aeronave.js
│   ├── AeronaveCarga.js
│   ├── AeronaveComercial.js
│   ├── AeronaveParticular.js
│   ├── AeronavePassageiros.js
│   ├── Aerovia.js
│   ├── Piloto.js
│   └── PlanoDeVoo.js
├── data/
│   ├── aerovia.json
│   ├── cadastro-pilotos.json
│   ├── ocupacao-aerovia.json
│   └── planos_de_voo.json
├── servico/
│   ├── OcupacaoAerovia.js
│   ├── ServicoAeronaves.js
│   ├── ServicoAerovia.js
│   ├── ServicoPiloto.js
│   └── ServicoPlanos.js
└── tests/
    ├── OcupacaoAerovia.test.js
    ├── ServicoAeronaves.test.js
    ├── ServicoAerovia.test.js
    ├── ServicoPiloto.test.js
    └── ServicoPlanos.test.js
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

que por sua vez executará o `node test runner` que está nativamente presente desde a versão 20+.

você deverá ver algo do tipo no seu terminal:

```
> pucrs-scta@1.0.0 test
> node --test --experimental-test-coverage ./src/tests/*.test.js

▶ Suite de testes recuperaOcupacaoAerovia
  ✔ deve retornar um objeto vazio quando nenhuma aerovia estiver ocupada (1.231959ms)
  ✔ deve retornar 24 slots desocupados para uma data sem ocupação definida (1.390792ms)
  ✔ deve retornar 10 slots ocupados para uma data com 10 ocupações definidas (0.403625ms)
  ✔ deve retornar 24 slots desocupados para uma não cadastrada (0.38075ms)
▶ Suite de testes recuperaOcupacaoAerovia (4.122916ms)
▶ Suite de testes altitudesLivres
  ✔ deve retornar um objeto com a altitude, data, e slots desocupados para a data informada (0.50225ms)
  ✔ deve retornar um array com apenas as altitudes lives as altitudes livres (0.381833ms)
▶ Suite de testes altitudesLivres (0.952209ms)
▶ Suite de testes altitudesLivresDataHora
  ✔ deve retornar um objeto com a altitude, data, e slots desocupados para a data informada (0.457375ms)
▶ Suite de testes altitudesLivresDataHora (0.508459ms)
▶ Suite de testes ocupa
  ✔ deve ocupar os slots da aerovia selecionada (0.798166ms)
  ✔ deve ocupar os slots da aerovia selecionada mesmo quando a data não existir no objeto (0.725583ms)
  ✔ deve retornar erro quando os slots a serem ocupados não estão entre 23 e 0 (0.627667ms)
  ✔ tenta ocupar um slot já ocupado previamente e valida a mensagem de erro (0.714334ms)
  ✔ valida que ao tentar ocupar uma slot em uma altitude inexistente o programa devolve uma mensagem de erro (0.695959ms)
  ✔ valida que ao tentar ocupar uma aerovia inexistente o programa devolve uma mensagem de erro (0.430333ms)
▶ Suite de testes ocupa (4.481375ms)
▶ Suite de testes ServicoAeronaves
  ✔ deve retornar um array vazio quando nenhuma aeronave estiver cadastrada (0.838875ms)
  ✔ deve retornar todas as aeronaves cadastradas (0.51875ms)
  ✔ deve retornar todas as informações de uma aeronave particular (0.112459ms)
  ✔ deve retornar todas as informações de uma aeronave carga (0.1035ms)
  ✔ deve retornar todas as informações de uma aeronave Passageiros (0.085833ms)
▶ Suite de testes ServicoAeronaves (2.518125ms)
▶ Suite de testes ServicoAerovia
  ✔ deve retornar um array vazio quando nenhuma aerovia estiver cadastrada (0.774583ms)
  ✔ deve retornar todas as aerovias cadastradas (0.409416ms)
  ✔ deve retornar uma aerovia pela sua origem e destino (0.236375ms)
  ✔ deve retornar todas as informações de uma aerovia (0.07825ms)
  ✔ deve retornar um objeto de aerovia através do seu id (0.19775ms)
  ✔ deve lançar um erro ao receber uma origem e destino inexistente (0.288125ms)
  ✔ deve lançar um erro ao receber um id de aerovia inexistente (0.110459ms)
  ✔ deve retornar um objeto contendo os dados da aerovia (0.078834ms)
▶ Suite de testes ServicoAerovia (3.359708ms)
▶ Suite de testes ServicoPilotos
  ✔ deve retornar um piloto pela matrícula (0.886083ms)
  ✔ deve lançar um erro ao receber uma matrícula inexistente (0.261083ms)
  ✔ deve retornar todos os pilotos cadastrados (0.1295ms)
  ✔ deve retornar um objeto contendo os dados do piloto (0.082875ms)
▶ Suite de testes ServicoPilotos (2.433042ms)
▶ Suite de testes ServicoPlanos
  ✔ deve criar um novo diretório de plano de voo se o diretório não existir (2.607916ms)
  ✔ deve criar um novo arquivo de plano de voo se o arquivo não existir (0.30375ms)
  ✔ valida que o id do terceiro objeto criado na terceira invocação da função "consiste" é 3 (0.471208ms)
  ✔ valida que o método toString() da classe retorna um objeto com todas as propriedades do objeto PlanoDeVoo (0.454541ms)
  ✔ valida que ao tentar encontrar um plano de voo inexistente o programa retorna um erro (0.446708ms)
▶ Suite de testes ServicoPlanos (5.195625ms)
arquivo deletado com sucesso!
arquivo deletado com sucesso!
arquivo deletado com sucesso!
ℹ tests 35
ℹ suites 8
ℹ pass 35
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 70.672292
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
ℹ src/classes/PlanoDeVoo.js          | 100.00 |   100.00 |  100.00 | 
ℹ src/servico/OcupacaoAerovia.js     | 100.00 |    96.77 |  100.00 | 
ℹ src/servico/ServicoAerovia.js      | 100.00 |   100.00 |  100.00 | 
ℹ src/servico/ServicoPilotos.js      | 100.00 |   100.00 |  100.00 | 
ℹ src/servico/ServicoPlanos.js       | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/OcupacaoAerovia.test.js  | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoAeronaves.test.js | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoAerovia.test.js   | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoPilotos.test.js   | 100.00 |   100.00 |  100.00 | 
ℹ src/tests/ServicoPlanos.test.js    | 100.00 |   100.00 |  100.00 | 
ℹ -----------------------------------------------------------------------------------
ℹ all files                          | 100.00 |    99.36 |  100.00 |
ℹ -----------------------------------------------------------------------------------
ℹ end of coverage report
```

> lembrando que esse projeto foi criado e compilado com node v20.16.0 (LTS), e pode ser necessário a atualização para o node 20 para usar o `node test runner` nativo da ferramenta.

## Segunda fase

Para a segunda fase tomei a liberdade de gravar os arquivos em JSON, na estrutura de pastas `data` temos os arquivos onde os dados são guardados e atualizados.

São eles 
`aerovias.json` - para guardar todas as aerovias cadastradas.
`cadastro-pilotos.json` - que armazena todos os pilotos cadastrados.
`ocupacao-aerovia.json` - que faz o intermédio entre uma aerovia, alturas, slots e datas.
`planos_de_voo.json` - que contém todos os planos de voos cadastrados.


## Exemplos de uso

Exemplos de uso estão dentro dos testes e principalmente no arquivo `src/app/Sistema.js`

para testar, apenas execute:

```shell
node src/app/Sistema.js
```

A resposta deve ser algo do tipo:

```shell
Exemplo de uso listarAeroviasEntreAeroportos
{ id: 'R2', tamanho: 2000, origem: 'POA', destino: 'GRU' }
----------------------------------------------

Exemplo de uso listarAltitudes
{
  altitude: 25000,
  data: '01/09/2024',
  slots_desocupados: [
     3,  4,  5,  6,  7,  8,  9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23
  ]
}
----------------------------------------------

Exemplo de uso listarPlano por ID
{
  id: 1,
  matriculaPiloto: '456',
  idAerovia: 'R2',
  data: '01/09/2024',
  horario: '18:00',
  altitude: 35000,
  slots: [ 0, 1, 2 ],
  cancelado: false
}
----------------------------------------------
```

Se quiser saber mais sobre as funções criadas, acesse o arquivo `src/app/Sistema.js`que contém o exemplo de uso das funções:

### listarAeroviasEntreAeroportos L135

```javascript
/**
 * Método que lista as aerovias existentes entre dois aeroportos.
 * @param {string} origem 
 * @param {string} destino 
 */
function listarAeroviasEntreAeroportos(origem, destino) {

  validate(arguments, ["string", "string"]);

  const nomeArquivo = "aerovias.json";
  const dir = path.resolve("./src/data");
  const filePath = path.join(dir, nomeArquivo);
  const data = fs.readFileSync(filePath, 'utf8');

  // Converter o conteúdo do arquivo para um objeto JavaScript
  const aerovias = JSON.parse(data);

  // Filtrar as aerovias que partem do aeroporto de origem para o aeroporto de destino
  const aeroviasFiltradas = aerovias.filter(aerovia => aerovia.origem === origem && aerovia.destino === destino);

  // Objeto que armazena as informações das aerovias
  let objListaAerovias = {};

  // Exibir a lista de aerovias filtradas
  aeroviasFiltradas.forEach(aerovia => {
    objListaAerovias = {
      id: aerovia.idAerovia,
      tamanho: aerovia.tamanho,
      origem: aerovia.origem,
      destino: aerovia.destino
    };
  });

  return objListaAerovias;
}

// Exemplo de uso listarAeroviasEntreAeroportos\
const aeroportoOrigem = 'POA';
const aeroportoDestino = 'GRU';

/*Exemplo de uso 1:
Listar as aerovias existentes entre dois aeroportos.
o Deve apresentar na tela a lista de todas as aerovias 
que partem do aeroporto A para o aeroporto B. 
*/
console.log(listarAeroviasEntreAeroportos(aeroportoOrigem, aeroportoDestino));
/*
  Exemplo de saída:
  { id: 'R2', tamanho: 2000, origem: 'POA', destino: 'GRU' }
  { id: 'R9', tamanho: 400, origem: 'POA', destino: 'GRU' }
*/
```

### listarAltitudes L193
```javascript
/**
 * Método que lista as altitudes disponíveis para um plano de voo.
 * @param {string} origem 
 * @param {string} destino 
 * @param {string} data DD/MM/AAAA
 * @param {number} hora - Hora do plano de voo (0-23)
 * @returns 
 */
function listarAltitudes(origem, destino, data, hora) {

  // Validar os argumentos
  validate(arguments, ["string", "string", "string", "number"]);

  // Obter o id da aerovia
  const idAerovia = listarAeroviasEntreAeroportos(origem, destino).id;

  // Obter as altitudes livres para a data e hora informadas
  return altitudesLivresDataHora(idAerovia, data, hora);
}

// Exemplo de uso listarAltitudes
console.log(listarAltitudes('POA', 'GRU', '01/09/2024', 3))
/*
  nesse exemplo, como o slot das 3 horas da data 01/09/2024 está ocupado,
  a função não retorna a altitude cujo slot está ocupado, apenas altitudes
  que permitem alocar um plano de voo para a data e hora informada.
*/
```

### aprovarPlanoDeVoo L221

```javascript
/**
 * Método que aprova um plano de voo e consiste o plano de voo
 * no sistema.
 * @param {PlanoDeVoo} planoDeVoo 
 * @param {Aeronave} aeronave 
 */
function aprovarPlanoDeVoo(planoDeVoo, aeronave) {

  // Validar os argumentos
  validate(arguments, ["PlanoDeVoo"]);

  let isPiotoHabilitado = false;
  let isAeronavePermitida = false;
  let isAltitudeDisponivel = false;

  // Verificar se o piloto existe e tem habilitação ativa
  if (recuperaPilotos(planoDeVoo.matriculaPiloto).habilitacaoAtiva) {
    isPiotoHabilitado = true;
  } else {
    throw new Error("O piloto não tem habilitação ativa, não foi possível aprovar o plano de voo.");
  }

  // Verifica se a aeronave pode voar
  if (validaAeronavePodeVoar(aeronave, planoDeVoo.idAerovia, planoDeVoo.altitude, planoDeVoo.slots[0])) {
    isAeronavePermitida = true;
  }

  const aeroviaTemp = recuperaAeroviaPorID(planoDeVoo.idAerovia);
  const listaAltitudesDisponiveis = listarAltitudes(aeroviaTemp.origem, aeroviaTemp.destino, planoDeVoo.data, planoDeVoo.slots[0]);

  // Verifica se a altitude está disponível
  if (listaAltitudesDisponiveis.slots_desocupados.length > 0) {
    // Verifica se a altitude está disponível

    for (let i = 0; i < planoDeVoo.slots.length; i++) {
      if (!listaAltitudesDisponiveis.slots_desocupados.includes(planoDeVoo.slots[i])) {
        isAltitudeDisponivel = false;
      } else {
        isAltitudeDisponivel = true;
      }
    }
  }
  // Se todas as condições forem verdadeiras, o plano de voo é aprovado
  if (isPiotoHabilitado && isAeronavePermitida && isAltitudeDisponivel) {

    const slotsNecessariosVoo = estimaHorasVoo(planoDeVoo.idAerovia, aeronave.velocidadeCruzeiro, planoDeVoo.slots[0]).slotsOcupados;
    //ocupa os slots de tempo da aerovia
    ocupa(planoDeVoo.idAerovia, planoDeVoo.data, planoDeVoo.altitude, slotsNecessariosVoo);

    // consiste o plano de voo
    consiste(planoDeVoo);
  } else {
    throw new Error("O plano de voo não pode ser aprovado.");
  }

}

let a2 = new AeronaveCarga('Cargo1', 1000, 50000, "Correios", 5000);
let p1 = new PlanoDeVoo('456', 'R2', '01/09/2024', "18:00", 35000, [0, 1, 2], false);

aprovarPlanoDeVoo(p1, a2);

// usa ambas as classes para validar o plano de voo, criando tanto ocupações no arquivo "ocupacao-aerovia.json" quanto seu cadastro no arquivo "planos_de_voo.json". Exemplos dentro da própria classe e na classe de teste "OcupacaoAerovia.test.js"
```


### listarPlano L227 

```javascript
/**
 * Método que usa a função "recupera" para recuperar um plano de voo pelo ID.
 * @param {number} id 
 * @returns 
 */
function listarPlano(id) {

  // Validar os argumentos
  validate(arguments, ["number"]);
  // recupera o plano de voo pelo id
  return recupera(id);
}
```


### métodos de apoio

também tomei a liberdade de criar alguns métodos de apoio para as funções principais:

`calculaAutonomia()` - método que valida se uma aeronave pode voar por uma determinada aerovia

`estimaHorasVoo()` - método que estima as horas de voo de acordo com a velocidade da nave e tamanho do trajeto

`validaAeronavePodeVoar()` - método que valida se uma determinada aeronave e suas extensões cumprem os pré-requisitos para voar

Muito obrigado