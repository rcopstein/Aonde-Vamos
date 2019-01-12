Aonde Vamos?
============

Programa para auxiliar os funcionários da DBServer na decisão de onde almoçar diariamente. Tem como requisitos:

* Permitir que cada usuário faça um voto diário no seu restaurante de preferência
* Expor o resultado de cada votação
* Impedir que um mesmo restaurante seja escolhido múltiplas vezes na mesma semana

Este repositório está dividido em dois módulos: [cliente](/client) e [servidor](/server), cada um com sua documentação própria.
Este programa foi desenvolvido como um _code-challenge_ durante o processo seletivo da DBServer.

## Decisões de Projeto

É considerado válido apenas um voto por usuário, identificado pelo IP do dispositivo utilizado na hora de fazer a requisição.

As votações para o almoço de cada dia se iniciam às 12:00 do dia anterior e encerram às 12:00 do dia em questão. Votos fora desse intervalo são considerados inválidos.

## Pendente

- [ ] Conectar com uma base de dados persistente ao invés de armazenar em memória
- [ ] Escrever testes para os componentes, serviços e testes _e2e_ no cliente