import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { MatchDTO } from "../../dtos/match/match";
import { CreateMatchDTO } from "../../dtos/match/createMatch";
import { UpdateMatchDTO } from "../../dtos/match/updateMatch";

export class MatchRepository {

  constructor(private prisma: PrismaClient) {}

  async save({
    data,
    horario,
    local,
    campeonatoId,
    time1Id,
    time2Id,
  }: CreateMatchDTO): Promise<MatchDTO[]> {
    const createMatch = await this.prisma.$queryRaw`
      INSERT INTO 'main'.'partidas' (
        'id',
        'data',
        'horario',
        'local',
        'campeonatoId',
        'time1Id',
        'time2Id',
        'placar1',
        'placar2'
      )
      VALUES (
        ${v4()},
        ${data},
        ${horario},
        ${local},
        ${campeonatoId},
        ${time1Id},
        ${time2Id},
        0,
        0
      )
    `;

    return createMatch as MatchDTO[];
  }

  async getAllMatches() {
    const matches = await this.prisma.$queryRaw`
      SELECT * FROM partidas;
    `;

    return matches as MatchDTO[];
  }

  async getMatchById(id: string) {
    const match = await this.prisma.$queryRaw`
      SELECT * FROM partidas WHERE id = ${id};
    `;

    return match as MatchDTO[];
  }

  async deleteMatch(id: string) {
    const matchDelete = await this.prisma.$queryRaw`
      DELETE FROM 'main'.'partidas'
      WHERE 'main'.'partidas'.'id' = ${id};
    `;
    return matchDelete;
  }

  async update(match: UpdateMatchDTO) {
    const matchUpdate = await this.prisma.$queryRaw`
      UPDATE 'main'.'partidas'
      SET 'data' = ${match.data},
          'horario' = ${match.horario},
          'local' = ${match.local},
          'campeonatoId' = ${match.campeonatoId},
          'time1Id' = ${match.time1Id},
          'time2Id' = ${match.time2Id},
          'placar1' = ${match.placar1},
          'placar2' = ${match.placar2}
      WHERE 'main'.'partidas'.'id' = ${match.id};
    `;
    return matchUpdate;
  }
}
