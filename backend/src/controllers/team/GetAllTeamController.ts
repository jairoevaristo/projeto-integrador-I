import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";

export class GetAllTeamController {
    async execute(req: Request, res: Response) {
        const teamRepository = new TeamRepository(prisma);
        const teamService = new TeamService(teamRepository);

        const teams = await teamService.getAllTeams();

        if (teams.length < 0) {
            return res.status(400).send({ message: 'Erro ao listar os times' });
        }

        return res.status(200).json(teams);
    }
}