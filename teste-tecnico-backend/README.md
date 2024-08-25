<h1 align = 'center'>
	Teste Tecnico - Back-End
</h1>

## Sobre o projeto

Esta parte do projeto é responsável pela criação e gestão do banco de dados (SQLite), incluindo a inserção inicial dos dados. Além disso, ela gera uma APIREST que disponibiliza rotas para a visualização e edição dos dados armazenados.

---

## Tecnologias

As seguintes ferramentas foram usadas na construção dessa desse projeto:

Back-End
- **NodeJS**
- **TypeScript**
- Bibliotecas
-   **Express**
-   **nodemon**
-   **ts-node-dev**
-   **Sequelize**

---

## Como executar o projeto

### Pre-requisitos

Antes de começar, voce vai precisar ter instalado em sua maquina as seguintes ferramentas:

Nodejs
Editor de codigo (VsCode)
Git

### Rodando a Aplicacao (Ambiente de desenvolvimento)

Apos instalado o NodeJs e glonado esse repositorio.

0. Abrir essa pasta **teste-tecnico/teste-tecnico-backend** em seu editor de codigo.
1. Iniciar um novo terminal.
2. No terminal, executar **npm install**.
3. Apos instalar as Dependencias. Rodar no terminal **npm run seed**  que semeará o banco de dados SQLite local. Aviso: Isso excluirá o banco de dados existente, se houver. O banco de dados fica em um arquivo local chamado database.sqlite3.
4. Em seguida, podemos executar no terminal **npm run dev**, onde ira iniciar o projeto.

OBS: Devido estarmos utilizando o TypeScript, esse modo de execução estara utilizando o **ts-node-dev**, para rodar o typescript em tempo de execução e caso acha alguma alteração no arquivo ele realiza o reload automatico.

### Rodando a Aplicacao 

Apos instalado o NodeJs e glonado esse repositorio.

0. Abrir essa pasta **teste-tecnico/teste-tecnico-backend** em seu editor de codigo.
1. Iniciar um novo terminal.
2. No terminal, executar **npm install**.
3. Apos instalar as Dependencias. Rodar no terminal **npm run seed**  que semeará o banco de dados SQLite local. Aviso: Isso excluirá o banco de dados existente, se houver. O banco de dados fica em um arquivo local chamado database.sqlite3.
4. Em seguida, podemos executar no terminal **npm run build**, que irá compilar os arquivos Typescript e gerara uma pasta **dist**, onde ficara os arquivos da aplicação ja compilados.
5. Apos a finalizar a compilação podemos rodar **npm start**, onde ira iniciar o projeto ja compilado.
