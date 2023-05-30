import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { ChampionshipRepository } from "../../repositories/championship";
import { ChampionshipService } from "../../services/ChampionshipService";

export class GetAllChampionshipController {
    async execute(req: Request, res: Response) {
        const championshipRepository = new ChampionshipRepository(prisma);
        const championshipService = new ChampionshipService(championshipRepository);

        const championship = await championshipService.getAllChampionship();

        if (championship.length < 0) {
            return res.status(400).send({ message: 'Erro ao listar os campeonatos' })
        }

        return res.status(200).json(championship)
    }
}