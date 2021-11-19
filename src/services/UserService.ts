import { getCustomRepository, Repository } from 'typeorm';
import { hash, compareSync, hashSync } from 'bcryptjs';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { ApiError } from '../exceptions/ApiError';
import { IUser } from '../interfaces/IUser.interface';
import { Organization } from '../entities/Organization';
import { OrganizationRepository } from '../repositories/OrganizationRepository';

class UserService {
  private connectUser: Repository<User>;

  private connectOrganization: Repository<Organization>;

  constructor() {
    this.connectUser = getCustomRepository(UserRepository);
    this.connectOrganization = getCustomRepository(OrganizationRepository);
  }

  async create(data: IUser) {
    const userExist = await this.connectUser.findOne({ email: data.email });
    if (userExist) {
      throw new ApiError(400, 'Usuário já existe');
    }

    const fkOrganization = await this.connectOrganization.findOne({ id: data.organization_id });
    if (!fkOrganization) {
      throw new ApiError(404, 'Id de organização não existe');
    }

    const user = this.connectUser.create(data);
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

  async update(data: IUser, id: string) {
    const user = await this.connectUser.findOne({ id });
    if (!user) {
      throw new ApiError(404, 'Usuário não existe!');
    }

    const fkOrganization = await this.connectOrganization.findOne({ id: data.organization_id });
    if (!fkOrganization) {
      throw new ApiError(404, 'Id de organização não existe');
    }

    if (data.password) {
      data.password = await hash(data.password, 8);
    }
    await this.connectUser.update(user.id, data);
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
