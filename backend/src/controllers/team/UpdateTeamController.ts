import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { UpdateTeamDTO } from "../../dtos/team/updateTeam";

import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";

export class UpdateTeamController {
  async execute(req: Request, res: Response) {
    const updateTeam: Omit<UpdateTeamDTO, 'userId'> = req.body;
    const teamRepository = new TeamRepository(prisma);
    const teamService = new TeamService(teamRepository);

    const team = await teamService.update({
      ...updateTeam
    });

    console.log(team);

    if (!team) {
      return res.status(400).send({ message: 'Erro ao atualizar o time' });
    }

    return res.send({ message: 'Time atualizado com sucesso.' }).status(200);
  }
}
