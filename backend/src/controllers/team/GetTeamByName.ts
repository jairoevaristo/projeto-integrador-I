import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { TeamRepository } from "../../repositories/team";
import { TeamService } from "../../services/TeamService";

export class GetTeamByName {
    async execute(req: Request, res: Response) {
        const { name } = req.body;

        const teamRepository = new TeamRepository(prisma);
        const teamService = new TeamService(teamRepository); 

        const team = await teamService.getTeamByName(name);
        return res.status(200).json(team);
    }
}
