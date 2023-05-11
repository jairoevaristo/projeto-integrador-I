import { SavePlayerDTO } from "../dtos/savePlayer";
import { AppLogger } from "../logger/AppLogger";
import { PlayerRepository } from "../repositories/player";

export class PlayerService {
  constructor(private playerRepository: PlayerRepository) {};

  async save({ nome, posicao, numero, imagem }: SavePlayerDTO) {
    try {
      const player = await this.playerRepository.save({
        nome,
        posicao,
        numero,
        imagem,
      });
      return player;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  };
};