import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";

export class GetTeamById {
    async execute(req: Request, res: Response) {
        const { id } = req.body;

        const teamRepository = new TeamRepository(prisma);
        const teamService = new TeamService(teamRepository); 

        const team = await teamService.getTeamById(id);
        return res.status(200).json(team);
    }
}
