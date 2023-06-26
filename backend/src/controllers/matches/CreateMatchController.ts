import { Request, Response } from "express";
import { prisma } from "../../infra/database/prisma";
import { CreateMatchDTO } from "../../dtos/match/createMatch";
import { MatchRepository } from "../../repositories/match";
import { MatchService } from "../../services/MatchService";

export class CreateMatchController {
  async execute(req: Request, res: Response) {
    const createMatch: Omit<CreateMatchDTO, 'userId'> = req.body;
    const matchRepository = new MatchRepository(prisma);
    const matchService = new MatchService(matchRepository);

    const match = await matchService.save({
      ...createMatch
    });

    console.log(match);

    if (!match) {
      return res.status(400).send({ message: 'Erro ao criar a partida' });
    }

    return res.send({ message: 'Partida criada com sucesso.' }).status(201);
  }
}
