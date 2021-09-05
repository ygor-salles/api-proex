import { Request, Response } from "express";
import httpStatus from "http-status";
import { PointService } from "../services/PointService";
import { PointDto } from "../validators/PointDto";

class PointController {
    async create(req: Request, resp: Response) {
        const { name, description, floor, altitude, latitude, longitude, isObstacle, map_id } = req.body;

        const pointValidator = new PointDto();
        try {
            await pointValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

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

        const pointValidator = new PointDto();
        try {
            await pointValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
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