import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { TeamDTO } from "../../dtos/team/team";
import { CreateTeamDTO } from "../../dtos/team/createTeam";
import { UpdateTeamDTO } from "../../dtos/team/updateTeam";

export class TeamRepository {
  delete(id: string) {
      throw new Error("Method not implemented.");
  }
  getTeamById(id: string) {
    throw new Error("Method not implemented.");
  }
  constructor(private prisma: PrismaClient) {}

  async save({
    nome,
    abreviacao,
    escudo,
    userId,
    campeonatoId,
  }: CreateTeamDTO): Promise<TeamDTO[]> {
    const createTeam = await this.prisma.$queryRaw`
      INSERT INTO 'main'.'times' (
        'id',
        'nome',
        'abreviacao',
        'escudo',
        'userId',
        'campeonatoId'
      )
      VALUES (
        ${v4()},
        ${nome},
        ${abreviacao},
        ${escudo},
        ${userId},
        ${campeonatoId}
      )
    `;

    return createTeam as TeamDTO[];
  }

  async getAllTeams() {
    const teams = await this.prisma.$queryRaw`
      SELECT * FROM times;
    `;

    return teams as TeamDTO[];
  }

  async getTeamByName(name: string) {
    const searchNameFormat = "%" + name + "%";

    const team = await this.prisma.$queryRaw`
      SELECT * FROM times WHERE nome LIKE ${searchNameFormat};
    `;

    return team as TeamDTO[];
  }

  async deleteTeam(id: string) {
    const teamDelete = await this.prisma.$queryRaw`
			DELETE FROM 'main'.'times' 
			WHERE 'main'.'times'.'id' = ${id};
		`;
    return teamDelete;
  }

  async update(team: UpdateTeamDTO) {
    const teamUpdate = await this.prisma.$queryRaw`
			UPDATE 'main'.'times' SET 'nome' = ${team.nome}, 'abreviacao' = ${team.abreviacao}, 'escudo' = ${team.escudo}
			WHERE 'main'.'times'.'id' = ${team.id};
		`;
    return teamUpdate;
  }
}
