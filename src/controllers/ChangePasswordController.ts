import { Request, Response } from "express";
import httpStatus from "http-status";
import { ChangeService } from "../services/ChangeService";
import { ChangeDto } from "../validators/ChangeDto";


class ChangePasswordController {
    async handle(request: Request, response: Response) {
        const { email, password, codVerificacao } = request.body;

        const changeValidator = new ChangeDto()
        try {
            await changeValidator.changeValidation().validate(request.body, { abortEarly: false });
        } catch (error) {
            return response.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const changeService = new ChangeService();
        try {
            const changePassword = await changeService.execute(email, password, codVerificacao);
            return response.status(changePassword.status).json({ message: changePassword.message });
        } catch (error) {
            return response.status(httpStatus.BAD_REQUEST).json({ message: 'Falha ao atualizar nova senha!' });
        }

    }
}

export { ChangePasswordController }