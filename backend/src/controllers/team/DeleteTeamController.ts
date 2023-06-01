import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";

export class DeleteTeamController {
  async execute(req: Request, res: Response) {
    const { id } = req.body;

    const teamRepository = new TeamRepository(prisma);
    const teamService = new TeamService(teamRepository);

    const teamDelete = await teamService.delete(id);

    if (!teamDelete) {
      return res.send({ message: "Houve um erro ao apagar time" }).status(400);
    }

    return res.send({ message: "Time apagado com sucesso" }).status(200);
  }
}