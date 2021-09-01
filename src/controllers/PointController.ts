import { Request, Response } from "express";
import * as yup from 'yup';
import httpStatus from "http-status";
import { PointService } from "../services/PointService";

class PointController {
    async create(req: Request, resp: Response) {
        // Dados recebidos na requisição
        const { name, description, floor, altitude, latitude, longitude, isObstacle, map_id } = req.body;

        // Validação dos campos recebidos no corpo da requisição
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            description: yup.string().required('Descrição é obrigatória'),
            floor: yup.number().required('O Andar é obrigatório'),
            altitude: yup.number().required('A Altitude é obrigatória'),
            latitude: yup.number().required('A Latitude é obrigatória'),
            longitude: yup.number().required('A Longitude é obrigatória'),
            isObstacle: yup.boolean().oneOf([true], 'O obstáculo é obrigatório'),
            map_id: yup.string().uuid('Id de mapa é obrigatório')
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        // Conexão com o banco de dados chamando a service
        const pointService = new PointService();
        try {
            const point = await pointService.create(name, description, floor, altitude, latitude, longitude, isObstacle, map_id);
            if(point.status === httpStatus.CREATED){
                return resp.status(httpStatus.CREATED).json(point.obj);
            } else {
                return resp.status(point.status).json({message: point.message});
            }            
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }

    }

    async ready(req: Request, resp: Response) {
        const pointService = new PointService();
        try {
            const allPoints = await pointService.ready();
            return resp.json(allPoints);
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async readyById(req: Request, resp: Response) {
        const { id } = req.params;
        
        const pointService = new PointService();
        try {
            const point = await pointService.readyById(id);
            if(point.status === httpStatus.OK){
                return resp.json(point.obj);
            }
            return resp.status(point.status).json({ message: point.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do ponto não encontrado' });
        }
    }

    async delete(req: Request, resp: Response) {
        const { id } = req.params;

        const pointService = new PointService();
        try {
            const point = await pointService.delete(id);
            return resp.status(point.status).json({ message: point.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do ponto não encontrado' });
        }
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params;
        const { name, description, floor, altitude, latitude, longitude, isObstacle, map_id } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            description: yup.string().required('Descrição é obrigatória'),
            floor: yup.number().required('O Andar é obrigatório'),
            altitude: yup.number().required('A Altitude é obrigatória'),
            latitude: yup.number().required('A Latitude é obrigatória'),
            longitude: yup.number().required('A Longitude é obrigatória'),
            isObstacle: yup.boolean().oneOf([true], 'O obstáculo é obrigatório'),
            map_id: yup.string().uuid('Id de mapa é obrigatório')
        })
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const pointService = new PointService()
        try {
            const point = await pointService.update(id, name, description, floor, altitude, latitude, longitude, isObstacle, map_id);
            return resp.status(point.status).json({ message: point.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do ponto não encontrado' });
        }
    }
}

export { PointController }