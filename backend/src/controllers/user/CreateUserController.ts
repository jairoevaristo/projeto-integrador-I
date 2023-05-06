import { Request, Response } from "express";
import { SaveUserDTO } from "../../dtos/saveUser";

import { prisma } from "../../infra/database/prisma";

import { UserRepository } from "../../repositories/user";
import { UserService } from "../../services/UserService";

export class CreateUserController {
  async execute(req: Request, res: Response) {
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    const { nome, email, senha, imagem }: SaveUserDTO = req.body;
    const isUserExists = await userService.findByEmail(email);

    if (isUserExists) {
      return res.send({ message: "Email já cadastrado!" }).status(400);
    }

    const user = await userService.save({ nome, email, senha, imagem });

    if (user) {
      return res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!" });
    }

    return res.send({ message: "Erro ao cadastrar usuário!" }).status(400);
  }
}
