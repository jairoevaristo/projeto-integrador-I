import { Request, Response } from "express";
import { prisma } from "../../infra/database/prisma";
import { MatchRepository } from "../../repositories/match";
import { MatchService } from "../../services/MatchService";

export class GetMatchById {
  async execute(req: Request, res: Response) {
    const { id } = req.body;
    const matchRepository = new MatchRepository(prisma);
    const matchService = new MatchService(matchRepository);

    const match = await matchService.getMatchById(id);
    return res.status(200).json(match);
  }
}