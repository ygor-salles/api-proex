import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { ForgotService } from '../services/ForgotService';
import { ForgotValidator } from '../validators/ForgotValidator';

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const forgotValidator = new ForgotValidator();
    try {
      await forgotValidator.forgotValidation().validate({ email }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const forgotService = new ForgotService();
    const forgotPassword = await forgotService.execute(email);
    return response.status(forgotPassword.status).json({ message: forgotPassword.message });
  }
}

export { ForgotPasswordController };
