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

## Exemplo de processo para alterações no projeto

- 1 - Estar no ambiente de dev
```bash
git checkout dev
```

- 2 - Atualizar o ambiente de dev (git pull)
```bash
git pull
```

- 3 - Após a atualização criar uma nova branch para alteração, exemplo:
```bash
git checkout -b feature/create-user
```

- 4 - Após as alterações no código, subir as alterações na branch recém criada:
```bash
git add . && git commit -m "feat: create User" && git push origin feature/create-user
```

- 5 - Clicar no primeiro link que estiver no terminal que levará direto para o github.
Clicar em Create Pull Request, e em seguida se não houver nenhum conflito e após ultima validação das alterações, clicar em Merge request. Com isso a branch de DEV será atualizada com as alterações realizadas.
E por fim clicar em delete branch, para finalizar a branch que ocorreu a alteração caso esteja finalizado toda aquela demanda.

- 6 - Logo após voltar para a branch dev no VSCode (git checkout dev) e executar o comando para atualizar a DEV
(git pull). Assim a branch DEV estará atualizada no seu repositório local. E para uma nova demanda, seguir novamente os mesmos passos, criar uma nova branch a partir da dev ...

## Atualizar ambiente de homolog ou prod a partir do ambiente de dev

* Entrar na branch homolog ou prod

```bash
git checkout homolog
```

* Puxar as alterações de dev

```bash
git merge dev
```

* Subir as alterações para a branch

```bash
git push
```