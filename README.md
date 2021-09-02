## :clipboard: Instruções

### BACKEND

- Criar um banco no postgres com o nome: app_proex

- Entrar no repositório backend do projeto com o terminal e executar o seguinte comando para instalar as dependências:
```bash
yarn
```

- Após todas as dependências instaladas criar na raiz da pasta backend um arquivo `.env`
e preencher as informações conforme se encontra no arquivo `.env_example`. 

- Rodar a migration, executando no terminal:
```bash
yarn typeorm migration:run
```

- Finalizado! Basta agora executar a aplicação backend com o seguinte comando:
```bash
yarn dev
```

- A Api estará rodando na porta conforme definido no arquivo .env em PORT, por padrão utilize
a porta 4000. `http://localhost:4000`

## Comandos migrations

- Criar uma migration
```bash
yarn typeorm migration:create -n CreateExample
```

- Rodar as migrations
```bash
yarn typeorm migration:run
```

- Desfazer alterações da migration
```bash
yarn typeorm migration:revert
```

## Gerar o build
```bash
yarn build
```

## Rodar a migration em homolog

* 1 - alterar no aquivo .env o NODE_ENV para homolog
* 2 - executar o comando yarn build caso o build não esteja atualizado
* 3 - executar o comando de rodar a migration - $ yarn typeorm migration:run 

## Rodar a migration em produção

* 1 - alterar no aquivo .env o NODE_ENV para production
* 2 - executar o comando yarn build caso o build não esteja atualizado
* 3 - executar o comando de rodar a migration - $ yarn typeorm migration:run 

## Link de homolog

* Link da api homolog: https://app-proex.herokuapp.com/

## Link de como foi feito o deploy do Heroku

https://www.youtube.com/watch?v=Zl7ORGmumLI

https://github.com/nunesfb/typeorm_typescript_nodejs_postgres_heroku