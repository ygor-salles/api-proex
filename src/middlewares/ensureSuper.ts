import { Request, Response, NextFunction } from 'express';
import { EnumRoleUser } from '../entities/User';
import { ApiError } from '../exceptions/ApiError';
import { UserService } from '../services/UserService';

export async function ensureSuper(request: Request, response: Response, next: NextFunction) {
  const { userId } = request;

  const userService = new UserService();

  try {
    const user = await userService.readById(userId);
    if (user.role === EnumRoleUser.SUPER) {
      return next();
    }

    throw new ApiError(401, 'Unauthorized');
  } catch (error) {
    throw new ApiError(404, 'Token inválido, usuário não existe no sistema!');
  }
}
