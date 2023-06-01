import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { CreateTeamDTO } from "../../dtos/team/createTeam";

import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";

export class CreateTeamController {
  async execute(req: Request, res: Response) {
    const createTeam: Omit<CreateTeamDTO, 'userId'> = req.body;
    const userId = req.user_id;
    const teamRepository = new TeamRepository(prisma);
    const teamService = new TeamService(teamRepository);

    const team = await teamService.save({
        ...createTeam,
        userId
    });

    console.log(team);

    if (!team) {
        return res.status(400).send({ message: 'Erro ao criar o time' });
    }

    return res.send({ message: 'Time criado com sucesso.' }).status(201);
  }
}