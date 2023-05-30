import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { ChampionshipDTO } from "../../dtos/championship/championship";
import { CreateChampionshipDTO } from "../../dtos/championship/createChampionship";

export class ChampionshipRepository {
    constructor(private prisma: PrismaClient) {}

  async save({
    dataFim,
    dataInicio,
    descricao,
    nome,
    premiacao,
    qtdTimes,
    situacao,
    tipoCampeonato,
    userId,
    logo
}: CreateChampionshipDTO): Promise<ChampionshipDTO[]> {
    const createChampionship = await this.prisma.$queryRaw`
			INSERT INTO 'main'.'campeonatos' (
                'id',
                'nome',
                'descricao',
                'premiacao',
                'dataInicio',
                'dataFim',
                'logo',
                'situacao',
                'qtdTimes',
                'userId', 
                'tipoCampeonato'
            ) 
			VALUES (
                ${v4()}, 
                ${nome}, 
                ${descricao}, 
                ${premiacao}, 
                ${dataInicio}, 
                ${dataFim},
                ${logo},
                ${situacao},
                ${qtdTimes},
                ${userId},
                ${tipoCampeonato}
              )
		`;

    return createChampionship as ChampionshipDTO[];
  }

  async getAllChampionship() {
    const championship = await this.prisma.$queryRaw`
      SELECT * FROM campeonatos;
    `;

    return championship as ChampionshipDTO[]
  }

  async getChampionshipByName(name: string) {
    const searchNameFormat = "%" + name + "%"

    const championship = await this.prisma.$queryRaw`
      SELECT * FROM campeonatos WHERE nome LIKE ${searchNameFormat};
    `;

    return championship as ChampionshipDTO[]
  }
}