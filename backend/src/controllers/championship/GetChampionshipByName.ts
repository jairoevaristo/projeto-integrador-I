import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { ChampionshipRepository } from "../../repositories/championship";
import { ChampionshipService } from "../../services/ChampionshipService";

export class GetChampionshipByName {
    async execute(req: Request, res: Response) {
        const { name } = req.body;

        const championshipRepository = new ChampionshipRepository(prisma);
        const championshipService = new ChampionshipService(championshipRepository); 

        const championship = await championshipService.getChampionshipByName(name);
        return res.status(201).json(championship);
    }
}