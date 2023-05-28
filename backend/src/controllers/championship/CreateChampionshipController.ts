import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { CreateChampionshipDTO } from "../../dtos/championship/createChampionship";

import { ChampionshipRepository } from "../../repositories/championship";
import { ChampionshipService } from "../../services/ChampionshipService";

export class CreateChampionshipController {
    async execute(req: Request, res: Response) {
        const createChampionship: Omit<CreateChampionshipDTO, 'userId'> = req.body;
        const userId = req.user_id;

        const championshipRepository = new ChampionshipRepository(prisma);
        const championshipService = new ChampionshipService(championshipRepository);

        const championship = await championshipService.save({
            ...createChampionship,
            situacao: 'ABERTO',
            userId
        });

        if (championship?.length < 0) {
            return res.status(400).send({ message: 'Erro ao criar o campeonato'})
        }

        return res.send({ message: 'Campeonato criado com sucesso.'}).status(201)

    }
}
