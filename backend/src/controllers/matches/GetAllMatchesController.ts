import { Request, Response } from "express";
import { prisma } from "../../infra/database/prisma";
import { MatchRepository } from "../../repositories/match";
import { MatchService } from "../../services/MatchService";

export class GetAllMatchesController {
  async execute(req: Request, res: Response) {
    const matchRepository = new MatchRepository(prisma);
    const matchService = new MatchService(matchRepository);

    const matches = await matchService.getAllMatches();

    if (matches.length === 0) {
      return res.status(400).send({ message: 'Erro ao listar as partidas' });
    }

    return res.status(200).json(matches);
  }
}
