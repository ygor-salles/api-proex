import httpStatus from "http-status";
import 'dotenv/config';
import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRepository } from "../repositories/UserRepository"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const connectUser = getCustomRepository(UserRepository)
        
        // Verificar se email existe
        const user = await connectUser.findOne({ email });
        
        if (!user) {
            return { status: httpStatus.BAD_REQUEST, message: 'Credenciais incorretas!' }
        }   

        // Verificar se a senha está correta
        const isMatchPassword = await compare(password, user.password)
        
        if (!isMatchPassword) {
            return { status: httpStatus.BAD_REQUEST, message: 'Credenciais incorretas!' }
        }

        // Gerar o token - https://www.md5hashgenerator.com/
        const token = sign({
            email: user.email
        }, process.env.TOKEN_SECRET, {
            subject: user.id,
            expiresIn: '1d',
        });

        return { token: token };
    }
}

export { AuthenticateUserService }
