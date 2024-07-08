# PetStation

Sistema Simples de Gerenciamento de Pets.

## Índice

- [Requisitos do Sistema](#requisitos-do-sistema)
- [Tecnologias Front-end](#tecnologias-front-end)
- [Como Rodar o Front-end](#como-rodar-o-front-end)
- [Links](#links)

## Requisitos do Sistema

- Sistema de CRUD Paginados e com Filtragem (Categoria e Animais)
- Documentação via Swagger:
  - Local: [Swagger Local](http://localhost:8080/swagger-ui/index.html)
  - Produção: [Swagger Produção](http://ec2-34-210-253-95.us-west-2.compute.amazonaws.com:8080/swagger-ui/index.html)
- Requisição de Edição de Status de Animal
- Deploy feito na AWS usando EC2 no back-end e S3 no front-end

## Tecnologias Front-end

- React-Query
- Primereact
- Vite
- Primeflex
- Redux

## Como Rodar o Front-end

1. Clone o repositório:
    ```bash
    git clone https://github.com/CR3WDev/petstation-front.git
    ```
2. Baixe as dependências do projeto dando:
    ```bash
    npm i
    ```
3. Escolha se vai querer executar localmente ou em produção usando:
   
   Local
    ```bash
    npm run dev
    ```
   Produção
    ```bash
    npm run prod
    ```

## Links

- Link do front-end: [PetStation Front-end](http://petstation.s3-website-us-west-2.amazonaws.com)
- Link do back-end: [PetStation Back-end](http://ec2-34-210-253-95.us-west-2.compute.amazonaws.com:8080)
