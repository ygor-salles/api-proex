import { Request, Response } from "express";
import * as yup from 'yup';
import httpStatus from "http-status";
import { MapService } from "../services/MapService";

class MapController {
    async create(req: Request, resp: Response) {
        // Dados recebidos na requisição
        const { name, source, description, building_id } = req.body;

        // Validação dos campos recebidos no corpo da requisição
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            source: yup.string().required('Url é obrigatório'),
            description: yup.string().required('Descrição é obrigatória'),
            building_id: yup.string().uuid('Id de prédio é obrigatório')
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        // Conexão com o banco de dados chamando a service
        const mapService = new MapService();
        try {
            const map = await mapService.create(name, source, description, building_id);
            if(map.status === httpStatus.CREATED){
                return resp.status(httpStatus.CREATED).json(map.obj);
            } else {
                return resp.status(map.status).json({message: map.message});
            }            
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }

    }

    async ready(req: Request, resp: Response) {
        const mapService = new MapService();
        try {
            const allMaps = await mapService.ready();
            return resp.json(allMaps);
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async readyById(req: Request, resp: Response) {
        const { id } = req.params;
        
        const mapService = new MapService();
        try {
            const map = await mapService.readyById(id);
            if(map.status === httpStatus.OK){
                return resp.json(map.obj);
            }
            return resp.status(map.status).json({ message: map.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async delete(req: Request, resp: Response) {
        const { id } = req.params;

        const mapService = new MapService();
        try {
            const map = await mapService.delete(id);
            return resp.status(map.status).json({ message: map.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params;
        const { name, source, description, building_id } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            source: yup.string().required('Url é obrigatória'),
            description: yup.string().required('Descrição é obrigatória'),
            building_id: yup.string().uuid('Id de prédio é obrigatório')
        })
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const mapService = new MapService()
        try {
            const map = await mapService.update(id, name, source, description, building_id);
            return resp.status(map.status).json({ message: map.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }
}

export { MapController }