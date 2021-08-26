import { Request, Response } from "express";
import * as yup from 'yup';
import httpStatus from "http-status";
import { UserService } from "../services/UserService";

class UserController {
    async create(req: Request, resp: Response) {
        // Dados recebidos na requisição
        const { name, email, password, role } = req.body;

        // Validação dos campos recebidos no corpo da requisição
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
            password: yup.string().required('Senha é obrigatória'),
            role: yup.string().required('Validação de campo administrador necessária')
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        // Conexão com o banco de dados chamando a service
        const userService = new UserService();
        try {
            const user = await userService.create(name, email, password, role);
            if(user.status === httpStatus.CREATED){
                return resp.status(httpStatus.CREATED).json(user.obj);
            } else {
                return resp.status(user.status).json({message: user.message});
            }            
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }

    }

    async ready(req: Request, resp: Response) {
        const userService = new UserService();
        try {
            const allUsers = await userService.ready();
            return resp.json(allUsers);
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async readyById(req: Request, resp: Response) {
        const { id } = req.params;
        
        const userService = new UserService();
        try {
            const user = await userService.readyById(id);
            if(user.status === httpStatus.OK){
                return resp.json(user.obj);
            }
            return resp.status(user.status).json({ message: user.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async delete(req: Request, resp: Response) {
        const { id } = req.params;

        const userService = new UserService();
        try {
            const user = await userService.delete(id);
            return resp.status(user.status).json({ message: user.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email().required('E-mail é obrigatório'),
            password: yup.string().required('Senha é obrigatória'),
            role: yup.string().required('Validação de campo administrador necessária')
        })
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const userService = new UserService()
        try {
            const user = await userService.update(id, name, email, password, role);
            return resp.status(user.status).json({ message: user.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }
}

export { UserController }