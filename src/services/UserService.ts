import { getCustomRepository, Repository } from 'typeorm';
import httpStatus from 'http-status';
import { hash, compareSync, hashSync } from 'bcryptjs';
import { EnumRoleUser, User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

class UserService {
  // eslint-disable-next-line prettier/prettier
  private connectUser: Repository<User>;

  constructor() {
    this.connectUser = getCustomRepository(UserRepository);
  }

  async create(name: string, email: string, password: string, role: EnumRoleUser) {
    try {
      const userExist = await this.connectUser.findOne({ email });
      if (userExist) {
        return { status: httpStatus.BAD_REQUEST, message: 'Usuário já existe' };
      }

      const passwordHash = await hash(password, 8);

      const user = this.connectUser.create({
        name,
        email,
        password: passwordHash,
        role
      });
      await this.connectUser.save(user);

      delete user.password;
      return { status: httpStatus.CREATED, obj: user };
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      return await this.connectUser.find({
        select: ['id', 'name', 'email', 'role', 'created_at']
      });
    } catch (error) {
      throw error;
    }
  }

  async readById(id: string) {
    try {
      const user = await this.connectUser.findOne({ id });
      if (user) {
        delete user.password;
        return { status: httpStatus.OK, obj: user };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Usuário não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const user = await this.connectUser.findOne({ id });
      if (user) {
        await this.connectUser.delete(user.id);
        return { status: httpStatus.OK, message: 'Usuário removido com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Usuário não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, name: string, email: string, password: string, role: EnumRoleUser) {
    try {
      const user = await this.connectUser.findOne({ id });
      if (user) {
        const passwordHash = await hash(password, 8);
        await this.connectUser.update(user.id, { name, email, password: passwordHash, role });
        return { status: httpStatus.OK, message: 'Usuário atualizado com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Usuário não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async updateChangePassword(email: string, password: string, codVerificacao: string) {
    try {
      const user = await this.connectUser.findOne({ email });
      if (!user) {
        return { status: httpStatus.NOT_FOUND, message: 'Usuário não encontrado!' }
      }

      const passwordIsValid = compareSync(
        codVerificacao,
        user.password,
      );

      if (!passwordIsValid) {
        return { status: httpStatus.NOT_FOUND, message: 'Código de verificação incorreto!' }
      }

      user.password = hashSync(password, 8);

      await this.connectUser.save(user);
      return { status: httpStatus.OK, message: 'Senha recuperada com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
}

export { UserService }