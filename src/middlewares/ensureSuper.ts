import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

export async  function ensureSuper (
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { user_id } = request;

    // Verificar se usuário admin
    const connectUser = getCustomRepository(UserRepository);
    const user = await connectUser.findOne({ id: user_id });

    if(user.role==='super') {
        return next();
    }

    return response.status(401).json({
        error: 'Unauthoraized',
    });
}