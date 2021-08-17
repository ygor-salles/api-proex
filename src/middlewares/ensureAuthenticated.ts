import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request, 
    response: Response,
    next: NextFunction 
) {
    // Receber o token
    const authToken = request.headers.authorization

    // Validar se o authToken está preenchido
    if(!authToken) {
        return response.status(401).end();
    }
    
    const [,token] = authToken.split(' ');

    try {
        // Validar se token é válido
        const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;
        
        // Recuperar informações do usuário
        request.userId = sub;
        
        return next();
    } catch (error) {
        return response.status(401).end();
    }
    
}