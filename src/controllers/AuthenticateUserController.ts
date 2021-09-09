import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { AuthDto } from '../validators/AuthDto';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authValidator = new AuthDto();
    try {
      await authValidator.authValidation().validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const authenticateUserService = new AuthenticateUserService();
    const token = await authenticateUserService.execute({
      email,
      password,
    });

    if (token.status === httpStatus.BAD_REQUEST) {
      return response.status(httpStatus.BAD_REQUEST).json(token);
    }
    return response.json(token);
  }
}

export { AuthenticateUserController };
