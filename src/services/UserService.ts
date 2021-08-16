import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import httpStatus from 'http-status';
import { hash } from 'bcryptjs';

class UserService {
    private connectUser: Repository<User>;
    constructor() {
        this.connectUser = getCustomRepository(UserRepository);
    }

    async create(name: string, email: string, password: string, role: string) {
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

    async ready() {
        try {
            return await this.connectUser.find({
                select: ['id', 'name', 'email', 'role', 'created_at']
            });
        } catch (error) {
            throw error;
        }
    }

    async readyById(id: string) {
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

    async update(id: string, name: string, email: string, password: string, role: string) {
        try {
            const user = await this.connectUser.findOne({ id });
            if (user) {
                await this.connectUser.update(user.id, { name, email, password, role });
                return { status: httpStatus.OK, message: 'Usuário atualizado com sucesso!' };
            }
            return { status: httpStatus.NOT_FOUND, message: 'Usuário não existe!' };
        } catch (error) {
            throw error;
        }
    }
}

export { UserService }