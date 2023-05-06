import { prisma } from "../../infra/database/prisma";

type Campeonato = {
  nome: string;
  descricao: string;
  premiacao: string;
  logo: string;
  situacao: Opcao;
  qtdTimes: number;
  userId: string;
  dataInicio: string;
  dataFim: string;
};
enum Opcao {
  iniciado = "INICIADO",
  finalizado = "FINALIZADO",
  cancelado = "CANCELADO",
  aberto = "ABERTO",
}
interface updateCampeonato extends Campeonato {
  id: string;
}

interface cadCampeonato extends Campeonato {
  tipoCampeonato: tipo;
}
enum tipo {
  PONTOS = "PONTOS",
  PLAYOFF = "PLAYOFF",
}

export const Campeonatos = {
  setCampeonato: async ({
    nome,
    descricao,
    premiacao,
    logo,
    situacao,
    qtdTimes,
    userId,
    tipoCampeonato,
    dataInicio,
    dataFim,
  }: cadCampeonato) => {
    let cad = await prisma.campeonato
      .create({
        data: {
          nome,
          descricao,
          premiacao,
          logo,
          situacao,
          qtdTimes: parseInt(qtdTimes as any),
          userId,
          tipoCampeonato,
          dataInicio,
          dataFim,
        },
      })
      .then((campeonato) => {
        console.log(campeonato);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
    return cad;
  },
  getCampeonatos: async (id: string) => {
    let lista: Object[] = [];
    const campeonato = await prisma.campeonato
      .findMany({
        where: {
          userId: id,
        },
      })
      .then((campeonato) => {
        return campeonato;
      })
      .catch((err) => {
        return false;
      });
    return campeonato;
  },
  busca: async (id: string) => {
    const campeonato = await prisma.campeonato
      .findMany({
        where: {
          id: id,
        },
      })
      .then((campeonatos) => {
        return campeonatos;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
    return campeonato;
  },
  deleteCampeonato: async (id: string) => {
    let deletado = await prisma.campeonato
      .delete({
        where: {
          id,
        },
      })
      .then((campeonato) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    return deletado;
  },
  updateCampeonato: async ({
    id,
    descricao,
    logo,
    nome,
    premiacao,
    qtdTimes,
    situacao,
    userId,
  }: updateCampeonato) => {
    let atualizado = await prisma.campeonato
      .update({
        where: {
          id,
        },
        data: {
          nome,
          descricao,
          logo,
          premiacao,
          qtdTimes,
          situacao,
          userId,
        },
      })
      .then((campeonato) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    return atualizado;
  },
};
