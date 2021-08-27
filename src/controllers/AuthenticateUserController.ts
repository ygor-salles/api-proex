import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();
        
        const token = await authenticateUserService.execute({
            email, password
        });

        if (token.status === httpStatus.BAD_REQUEST) {
            return response.status(httpStatus.BAD_REQUEST).json(token)
        }
        return response.json(token);
    }
}

export { AuthenticateUserController }