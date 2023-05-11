import { Request, Response } from "express";
import { SavePlayerDTO } from "../../dtos/savePlayer";
import { prisma } from "../../infra/database/prisma";
import { PlayerRepository } from "../../repositories/player";
import { PlayerService } from "../../services/PlayerService";

export class CreatePlayerController {
  async execute(req: Request, res: Response) {
    const playerRepository = new PlayerRepository(prisma);
    const playerService = new PlayerService(playerRepository);

    const { nome, posicao, numero, imagem }: SavePlayerDTO = req.body;

    const player = await playerService.save({ nome, posicao, numero, imagem });

    if (player) {
      return res
        .status(201)
        .send({ message: "Jogador cadastrado com sucesso!" });
    }

    return res.send({ message: "Erro ao cadastrar jogador!" }).status(400);
  };
};