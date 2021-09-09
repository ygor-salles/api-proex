import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ForgotService } from '../services/ForgotService';
import { ForgotDto } from '../validators/ForgotDto';

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const forgotValidator = new ForgotDto();
    try {
      (await forgotValidator.forgotValidation()).validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const forgotService = new ForgotService();
    try {
      const forgotPassword = await forgotService.execute(email);
      return response.status(forgotPassword.status).json({ message: forgotPassword.message });
    } catch (error) {
      return response.status(httpStatus.BAD_REQUEST).json({ message: 'Falha ao recuperar senha!' });
    }
  }
}

export { ForgotPasswordController };
