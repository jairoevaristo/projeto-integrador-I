import { SaveUserDTO } from "../dtos/saveUser";
import { updateUserDTO } from "../dtos/updateUser";
import { AppLogger } from "../logger/AppLogger";
import { UserRepository } from "../repositories/user";

import { criptografar } from "./criptografia/criptografia";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async save({ nome, email, senha, imagem }: SaveUserDTO) {
    try {
      const user = await this.userRepository.save({
        email,
        imagem,
        nome,
        senha: criptografar(senha),
      });
      return user;
    } catch (error: any) {
      new AppLogger().error({ error: error.message });
      return false;
    }
  }

  async login(email: string, senha: string) {
    try {
      const user = await this.userRepository.login(email, senha);
      return user;
    } catch (error: any) {
      new AppLogger().error({ error: error.message });
      return false;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error: any) {
      new AppLogger().error({ error: error.message });
      return false;
    }
  }

  async update(user: updateUserDTO, id: string) {
    try {
      const userUpdate = await this.userRepository.update(user, id);
      return userUpdate;
    } catch (error: any) {
      new AppLogger().error({ error: error.message });
      return false;
    }
  }

  async delete(id: string) {
    try {
      const userDelete = await this.userRepository.delete(id);
      return userDelete;
    } catch (error: any) {
      new AppLogger().error({ error: error.message });
      return false;
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepository.findUserById(id);
      return user;
    } catch (error: any) {
      new AppLogger().error({ error: error.message });
      return false;
    }
  }
}
