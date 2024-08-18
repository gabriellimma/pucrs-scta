# pucrs-scta
Sistema de Controle de Tráfego Aéreo desenvolvido como projeto final de programação orientada a objetos


## Como usar e testar esse projeto

Após fazer o download do projeto, será necessário instalar as dependências do mesmo:

`npm install`

as depêndencias usadas foram `bycontract` para validação de tipos e `eslint` para validação de padrões de escrita e análise estática de código.

Tomei a liberdade de implementar os exemplos de uso das classes de serviço com `testes unitários`, para executar os exemplos de uso execute: 

```npm test```

que por sua vez executará o `node test runner` que está nativamente presente desde a versão 20.

<small>
lembrando que esse projeto foi criado e compilado com node v20.16.0 (LTS), e pode ser necessário a atualização para o node 20 para usar o `node test runner` nativo da ferramenta.
</small>