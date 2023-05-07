# Projeto Integrador I

## Descrição do Projeto

Sistema de gerenciamento de campeonatos.
<hr />

## Tecnologias utilizadas

- ReactJs
- NodeJs
- Express
- Typescript
- Tailwindcss
- SQLite

<hr />

## Pré-requisitos
 - NodeJs 14.x.x <br />[Download NodeJs v14](https://nodejs.org/en/blog/release/v14.17.3/?target=_blank)

## Instalação

1 - Clone o repositório

```bash
git clone https://github.com/jairoevaristo/projeto-integrador-I.git
```

2 - Instale as dependências

```bash
cd frontend && npm install
```

Em seguida

```bash
cd backend && npm install
```

3 - Crie um arquivo chamado `.env` na pasta `backend`, dentro desse arquivo inserir uma key chamada `JWT_SECRET`, da mesma forma como o arquivo `.env.example`, essa key pode ter qualquer valor em string
recomenda-se gerar um hash para ser o valor dessa key.

<br /> [Link para gerar hash](https://www.md5hashgenerator.com/)

<hr />

## Execução

**💻 frontend**

```bash
cd frontend && npm run dev
```

**⚙ backend**

```bash
cd backend && npm run dev
```

**🎲 Visualizar banco de dados (opcional)**

```bash
cd frontend && npx prisma studio
```

Após executar o comando para visualizar o banco de dados, acesse o endereço: **`http://localhost:5555/`**
