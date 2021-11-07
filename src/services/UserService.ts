import { getCustomRepository, Repository } from 'typeorm';
import { hash, compareSync, hashSync } from 'bcryptjs';
import { EnumRoleUser, User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { ApiError } from '../exceptions/ApiError';

class UserService {
  private connectUser: Repository<User>;

  constructor() {
    this.connectUser = getCustomRepository(UserRepository);
  }

  async create(name: string, email: string, password: string, role: EnumRoleUser) {
    const userExist = await this.connectUser.findOne({ email });
    if (userExist) {
      throw new ApiError(400, 'Usuário já existe');
    }

    const user = this.connectUser.create({
      name,
      email,
      password,
      role,
    });
    await this.connectUser.save(user);

    delete user.password;
    return user;
  }

  async read() {
    const allUsers = await this.connectUser.find({
      select: ['id', 'name', 'email', 'role', 'created_at'],
    });
    return allUsers;
  }

  async readById(id: string) {
    const user = await this.connectUser.findOne({ id });
    if (!user) {
      throw new ApiError(404, 'Usuário não existe!');
    }

    delete user.password;
    return user;
  }

  async delete(id: string) {
    const user = await this.connectUser.findOne({ id });
    if (!user) {
      throw new ApiError(404, 'Usuário não existe!');
    }

    await this.connectUser.delete(user.id);
  }

  async update(id: string, name: string, email: string, password: string, role: EnumRoleUser) {
    const user = await this.connectUser.findOne({ id });
    if (!user) {
      throw new ApiError(404, 'Usuário não existe!');
    }

    const passwordHash = await hash(password, 8);
    await this.connectUser.update(user.id, { name, email, password: passwordHash, role });
  }

  async updateChangePassword(email: string, password: string, codVerificacao: string) {
    const user = await this.connectUser.findOne({ email });
    if (!user) {
      throw new ApiError(404, 'Usuário não encontrado!');
    }

    const passwordIsValid = compareSync(codVerificacao, user.password);

    if (!passwordIsValid) {
      throw new ApiError(400, 'Código de verificação incorreto!');
    }

    user.password = hashSync(password, 8);

    await this.connectUser.save(user);
  }
}

export { UserService };
