import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { ChampionshipRepository } from "../../repositories/championship";
import { ChampionshipService } from "../../services/ChampionshipService";

export class DeleteChampionshipController {
  async execute(req: Request, res: Response) {
    const { id } = req.body;

    const championshipRepository = new ChampionshipRepository(prisma);
    const championshipService = new ChampionshipService(championshipRepository);

    const championshipDelete = await championshipService.delete(id);

    if (!championshipDelete) {
      return res.send({ message: "Houve um erro ao apagar campeonato" }).status(400);
    }

    return res.send({ message: "Campeonato apagado com sucesso" }).status(200);
  }
}