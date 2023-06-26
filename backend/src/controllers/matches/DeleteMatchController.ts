import { Request, Response } from "express";
import { prisma } from "../../infra/database/prisma";
import { MatchRepository } from "../../repositories/match";
import { MatchService } from "../../services/MatchService";

export class DeleteMatchController {
  async execute(req: Request, res: Response) {
    const { id } = req.body;

    const matchRepository = new MatchRepository(prisma);
    const matchService = new MatchService(matchRepository);

    const matchDelete = await matchService.delete(id);

    if (!matchDelete) {
      return res.send({ message: "Houve um erro ao apagar a partida" }).status(400);
    }

    return res.send({ message: "Partida apagada com sucesso" }).status(200);
  }
}
