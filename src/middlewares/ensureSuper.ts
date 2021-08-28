import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { EnumRoleUser } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export async  function ensureSuper (
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { userId } = request;

    // Verificar se usuário admin
    const connectUser = getCustomRepository(UserRepository);
    const user = await connectUser.findOne({ id: userId });

    if(user.role===EnumRoleUser.SUPER) {
        return next();
    }

    return response.status(401).json({
        error: 'Unauthoraized',
    });
}