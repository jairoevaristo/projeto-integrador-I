import { Request, Response } from "express";
import { prisma } from "../../infra/database/prisma";
import { UpdateMatchDTO } from "../../dtos/match/updateMatch";
import { MatchRepository } from "../../repositories/match";
import { MatchService } from "../../services/MatchService";

export class UpdateMatchController {
  async execute(req: Request, res: Response) {
    const updateMatch: Omit<UpdateMatchDTO, 'userId'> = req.body;
    const matchRepository = new MatchRepository(prisma);
    const matchService = new MatchService(matchRepository);

    const match = await matchService.update({
      ...updateMatch
    });

    console.log(match);

    if (!match) {
      return res.status(400).send({ message: 'Erro ao atualizar a partida' });
    }

    return res.send({ message: 'Partida atualizada com sucesso.' }).status(200);
  }
}
