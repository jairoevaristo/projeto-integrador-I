import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { ChampionshipDTO } from "../../dtos/championship/championship";
import { CreateChampionshipDTO } from "../../dtos/championship/createChampionship";
import { UpdateChampionshipDTO } from "../../dtos/championship/updateChampionship";

export class ChampionshipRepository {
  
  constructor(private prisma: PrismaClient) {}

  async getChampionshipById(id: string) {
    const championship = await this.prisma.$queryRaw`
      SELECT * FROM campeonatos WHERE id = ${id};
    `;

    return championship as ChampionshipDTO[]
  }

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

  async update(championship: UpdateChampionshipDTO) {
    const championshipUpdate = await this.prisma.$queryRaw`
      UPDATE "main"."campeonatos" SET "nome" = ${championship.nome}, "descricao" = ${championship.descricao}, 
      "premiacao" = ${championship.premiacao}, "dataInicio" = ${championship.dataInicio}, "dataFim" = ${championship.dataFim},
      "logo" = ${championship.logo}, "situacao" = ${championship.situacao}, "qtdTimes" = ${championship.qtdTimes},
      "tipoCampeonato" = ${championship.tipoCampeonato}
      WHERE "main"."campeonatos"."id" = ${championship.id};
    `;
  
    return championshipUpdate;
  }

  async deleteChampionship(id: string) {
    const championshipDelete = await this.prisma.$queryRaw`
			DELETE FROM 'main'.'campeonatos' 
			WHERE 'main'.'campeonatos'.'id' = ${id};
		`;
    return championshipDelete;
  }
}