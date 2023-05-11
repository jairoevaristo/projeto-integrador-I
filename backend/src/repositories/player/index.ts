import { PrismaClient } from "@prisma/client";
import { SavePlayerDTO } from "../../dtos/savePlayer";
import { Player } from "../../dtos/player";
import { v4 } from "uuid";

export class PlayerRepository {
  constructor(private prisma: PrismaClient) {}

  async save(player: SavePlayerDTO): Promise<Player[]> {
    const createPlayer = await this.prisma.$queryRaw`
			INSERT INTO 'main'.'jogador' ('id', 'nome', 'posicao', 'numero', 'imagem', 'timeId') 
			VALUES (
                ${v4()}, 
                ${player.nome}, 
                ${player.posicao}, 
                ${player.numero}, 
                ${player.imagem},
                ${v4()}
            ) RETURNING id
		`;

    return createPlayer as Player[];
  };

  async delete(id: string) {
    const playerDelete = await this.prisma.$queryRaw`
			DELETE FROM 'main'.'jogador' 
			WHERE 'main'.'jogador'.'id' = ${id};
		`;
    return playerDelete;
  };
};