import { Request, Response } from "express";

import { prisma } from "../../infra/database/prisma";

import { UserRepository } from "../../repositories/user";
import { UserService } from "../../services/UserService";

export class CurrentUserController {
  async execute(req: Request, res: Response) {
    const id = req.user_id;

    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    const user = await userService.findUserById(id);

    if (!user) {
      return res.send({ message: "Usuário não encontrado" }).status(400);
    }

    return res.status(200).json(user);
  }
}
