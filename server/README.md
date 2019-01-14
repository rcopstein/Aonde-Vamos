Aonde Vamos? (Servidor)
=======================

O servidor de _Aonde Vamos?_ expõe uma API Rest para a consulta a manipulação de votações. Foi desenvolvido na linguagem [TypeScript](http://www.typescriptlang.org) usando o framework [nodeJS](https://nodejs.org/en/).

## Estrutura

Este projeto segue as ideias do padrão MVC e está localizado dentro da pasta [/src](/src).
A mesma está dividia em subpastas de acordo com a responsabilidade dos arquivos contidos:

* [/src/config](src/config) - contém arquivos de configuração e inicialização de dependências
* [/src/controllers](src/controllers) - contém arquivos de controladores
* [/src/errors](src/errors) - contém arquivos de classes que herdam de _Error_ do JavaScript
* [/src/middleware](src/middleware) - contém arquivos que implementam _middleware_ para as requisições
* [/src/routes](src/routes) - descrevem as rotas da API REST e fazem a ponte entre as requisições e os controladores

## Destaques

- O servidor foi projetado pensando em fácil manutenção e testes. Essa filosofia pode ser observada nos [controladores](src/controllers) que expõe tanto uma instância única (_singleton_) quanto um construtor público, o que permite que elas sejam testadas individualmente. Além disso, controladores que necessitam acessar outros controladores recebem uma instância do mesmo no construtor (_dependency injection_), permitindo desassociação (_decoupling_) das classes e facilitando o teste.

- O tratamento de rotas REST foi desenvolvido seguindo o padrão da biblioteca [Express](https://github.com/expressjs/express) de _middlewares_. Middlewares são funções intermediárias entre a requisição REST e sua ação no controlador. Neste projeto elas foram usadas para fazer a validação de parâmetros comuns a múltiplas requisições como data e restaurante votado, e para fazer a captura de informações, como o endereço IP do usuário.

- Dentro dos moldes da arquitetura MVC, os controladores desconhecem o conceito de requisição HTTP, e trabalham de maneira isolada. Eventuais erros lógicos que venham a ocorrer no controlador são expostos como _Errors_ (similares à exceções em linguagens como Java e C#) e deixam que os componentes de [rotas](src/routes) transformem os erros em respostas HTTP apropriadas.

- Para facilitar o _debugging_ do servidor foram adicionadas rotinas para reconhecer um parâmetro "dataAtual" em requisições feitas ao servidor. Quando esse parâmetro for encontrado, ele será convertido em uma data e, esta, será usada como referência para o horário atual. Dessa forma, é possível testar as funcionalidades sem que o horário da execução do teste influencie no mesmo.

## Execução

Para executar o servidor é necessário, primeiro, baixar as dependências do programa. Isso é feito usando o comando na raiz do projeto:

```bash
npm install
```

Em seguida, é preciso compilar os fontes em TypeScript para JavaScript. Isso é feito usando o comando:

```bash
npm run compile
```

Depois, iniciamos a execução do servidor com o comando:

```bash
npm run start
```

O servidor passará a executar na porta 3000 da máquina local.

## Testes

O programa conta com rotinas de testes unitários e teste de integração que testam as funcionalidades do programa. Estes estão localizados na pasta [/test](test).

Para executar os testes unitários é necessário usar o comando na raiz do projeto:

```bash
npm run test-unit
```

Para os testes de integração, usamos o comando:

```bash
npm run test-int
```

É importante que o servidor não esteja rodando quando os testes de integração forem executados pois os mesmos o iniciarão automaticamente.
