import { Request, Response } from "express";
import { prisma } from "../../infra/database/prisma";
import { UpdateChampionshipDTO } from "../../dtos/championship/updateChampionship";
import { ChampionshipRepository } from "../../repositories/championship";
import { ChampionshipService } from "../../services/ChampionshipService";

export class UpdateChampionshipController {
  async execute(req: Request, res: Response) {
    const updateChampionship: Omit<UpdateChampionshipDTO, 'userId'> = req.body;
    const championshipRepository = new ChampionshipRepository(prisma);
    const championshipService = new ChampionshipService(championshipRepository);

    const championship = await championshipService.update({
      ...updateChampionship
    });

    console.log(championship);

    if (!championship) {
      return res.status(400).send({ message: 'Erro ao atualizar o campeonato' });
    }

    return res.send({ message: 'Campeonato atualizado com sucesso.' }).status(200);
  }
}
