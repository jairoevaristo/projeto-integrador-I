CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "imagem" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "recuperarSenha" TEXT
);

CREATE TABLE "times" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "abreviacao" TEXT NOT NULL,
    "escudo" TEXT,
    "userId" TEXT
);

CREATE TABLE "jogadores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "imagem" TEXT,
    "timeId" TEXT
);

CREATE TABLE "campeonatos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "premiacao" TEXT NOT NULL,
    "dataInicio" TEXT NOT NULL,
    "dataFim" TEXT NOT NULL,
    "logo" TEXT,
    "situacao" TEXT NOT NULL DEFAULT 'ABERTO',
    "qtdTimes" INTEGER NOT NULL,
    "userId" TEXT,
    "tipoCampeonato" TEXT NOT NULL DEFAULT 'PONTOS'
);

CREATE TABLE "partidas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "campeonatoId" TEXT NOT NULL,
    "time1Id" TEXT NOT NULL,
    "time2Id" TEXT NOT NULL,
    "placar1" INTEGER NOT NULL,
    "placar2" INTEGER NOT NULL,
    "userId" TEXT
);

CREATE TABLE "pontosCorridos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campeonatoId" TEXT NOT NULL,
    "timeId" TEXT NOT NULL,
    "pontos" INTEGER NOT NULL,
    "jogos" INTEGER NOT NULL,
    "vitorias" INTEGER NOT NULL,
    "empates" INTEGER NOT NULL,
    "derrotas" INTEGER NOT NULL,
    "golsPro" INTEGER NOT NULL,
    "golsContra" INTEGER NOT NULL,
    "saldoGols" INTEGER NOT NULL
);

CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
