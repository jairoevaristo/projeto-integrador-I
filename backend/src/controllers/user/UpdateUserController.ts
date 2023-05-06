import { Request, Response } from "express";
import { updateUserDTO } from "../../dtos/updateUser";
import { prisma } from "../../infra/database/prisma";
import { UserRepository } from "../../repositories/user";
import { UserService } from "../../services/UserService";

export class UpdateUserController {
  async execute(req: Request, res: Response) {
    const { ativo, email, imagem, nome, senha }: updateUserDTO = req.body;
    const id = req.user_id;

    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    const user = await userService.update(
      {
        ativo,
        email,
        imagem,
        nome,
        senha,
      },
      id
    );

    if (!user) {
      return res.send({ message: "Erro ao atualizar usuário!" }).status(400);
    }

    return res.send({ message: "Usuário atualizado com sucesso!" }).status(200);
  }
}
