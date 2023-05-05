import { Request, Response } from "express";
import JsonWebToken from "jsonwebtoken";
import { LoginUserDTO } from "../../dtos/loginUser";

import { prisma } from "../../prisma";

import { UserRepository } from "../../repositories/user";
import { criptografar } from "../../services/criptografia/criptografia";
import { UserService } from "../../services/UserService";

export class LoginUserController {
    async execute(req: Request, res: Response) {
		const { email, senha }: LoginUserDTO = req.body;
        
        const userRepository = new UserRepository(prisma);
        const userService = new UserService(userRepository);

		if (email && senha) {
			const passwordCrypto = criptografar(senha);
			const usuario: any = await userService.login(email, passwordCrypto);
	
			if (usuario.length === 0) {
				return res.status(400).send({ message: "Usuario ou senha invalidos!" });
			}
	 
			const token = JsonWebToken.sign(
				{ email },
				process.env.JWT_SECRET as string,
				{
				  expiresIn: "8h",
				  subject: usuario[0]?.id,
				}
			  );
	
			return res.send({
				message: "Login realizado com sucesso!",
				token,
				user: usuario[0]
			}).status(200);
		}
	};
}