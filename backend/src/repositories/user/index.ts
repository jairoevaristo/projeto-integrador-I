import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { SaveUserDTO } from "../../dtos/user/saveUser";
import { updateUserDTO } from "../../dtos/user/updateUser";
import { User } from "../../dtos/user/user";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(user: SaveUserDTO): Promise<User[]> {
    const createUser = await this.prisma.$queryRaw`
			INSERT INTO 'main'.'usuarios' ('id', 'nome', 'email', 'senha', 'imagem', 'ativo', 'recuperarSenha') 
			VALUES (
                ${v4()}, 
                ${user.nome}, 
                ${user.email}, 
                ${user.senha}, 
                ${user.imagem}, 
                false, 
                ${v4()}
            ) RETURNING id
		`;

    return createUser as User[];
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.$queryRaw`
			SELECT 'main'.'usuarios'.'id', 'main'.'usuarios'.'nome', 
			'main'.'usuarios'.'email', 'main'.'usuarios'.'senha', 'main'.'usuarios'.'imagem', 
			'main'.'usuarios'.'ativo', 'main'.'usuarios'.'recuperarSenha' 
			FROM 'main'.'usuarios' 
			WHERE ('main'.'usuarios'.'email' = ${email}
			AND 'main'.'usuarios'.'senha' = ${senha});
		`;
    return user;
  }

  async findByEmail(email: string): Promise<User[]> {
    const user = await this.prisma.$queryRaw`
			SELECT 'main'.'usuarios'.'id', 'main'.'usuarios'.'nome', 
			'main'.'usuarios'.'email', 'main'.'usuarios'.'senha', 'main'.'usuarios'.'imagem', 
			'main'.'usuarios'.'ativo', 'main'.'usuarios'.'recuperarSenha' 
			FROM 'main'.'usuarios' 
			WHERE ('main'.'usuarios'.'email' = ${email});
		`;
    return user as User[];
  }

  async findUserById(id: string) {
    const user = await this.prisma.$queryRaw`
			SELECT 'main'.'usuarios'.'id', 'main'.'usuarios'.'nome', 
			'main'.'usuarios'.'email', 'main'.'usuarios'.'senha', 'main'.'usuarios'.'imagem', 
			'main'.'usuarios'.'ativo', 'main'.'usuarios'.'recuperarSenha' 
			FROM 'main'.'usuarios' 
			WHERE ('main'.'usuarios'.'id' = ${id});
		`;
    return user;
  }

  async update(user: updateUserDTO, id: string) {
    let query = this.prisma.$queryRaw`
      UPDATE 'main'.'usuarios' SET 'nome' = ${user.nome}, 'email' = ${user.email}, 
      'imagem' = ${user.imagem}, 'ativo' = ${user.ativo} WHERE 'main'.'usuarios'.'id' = ${id}
    `;
  
    if (user.senha !== null) {
      query = this.prisma.$queryRaw`
        UPDATE 'main'.'usuarios' SET 'nome' = ${user.nome}, 'email' = ${user.email}, 
        'senha' = ${user.senha}, 'imagem' = ${user.imagem}, 'ativo' = ${user.ativo} 
        WHERE 'main'.'usuarios'.'id' = ${id}
      `;
    }
  
    const userUpdate = await query;
    return userUpdate;
  }

  async delete(id: string) {
    const userDelete = await this.prisma.$queryRaw`
			DELETE FROM 'main'.'usuarios' 
			WHERE 'main'.'usuarios'.'id' = ${id};
		`;
    return userDelete;
  }
}
