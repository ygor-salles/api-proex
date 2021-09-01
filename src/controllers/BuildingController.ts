import { Request, Response } from "express";
import * as yup from 'yup';
import httpStatus from "http-status";
import { BuildingService } from "../services/BuildingService";

class BuildingController {
    async create(req: Request, resp: Response) {
        // Dados recebidos na requisição
        const { name, latitude, longitude, description, organization_id } = req.body;

        // Validação dos campos recebidos no corpo da requisição
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            latitude: yup.number().required('Latitude é obrigatória'),
            longitude: yup.number().required('Longitude é obrigatória'),
            description: yup.string().required('Descrição é obrigatória'),
            organization_id: yup.string().required('Id da Organização é obrigatória')
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        // Conexão com o banco de dados chamando a service
        const buildingService = new BuildingService();
        try {
            const building = await buildingService.create(name, latitude, longitude, description, organization_id);
            if(building.status === httpStatus.CREATED){
                return resp.status(httpStatus.CREATED).json(building.obj);
            } else {
                return resp.status(building.status).json({message: building.message});
            }            
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }

    }

    async ready(req: Request, resp: Response) {
        const buildingService = new BuildingService();
        try {
            const allBuildings = await buildingService.ready();
            return resp.json(allBuildings);
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async readyById(req: Request, resp: Response) {
        const { id } = req.params;
        
        const buildingService = new BuildingService();
        try {
            const building = await buildingService.readyById(id);
            if(building.status === httpStatus.OK){
                return resp.json(building.obj);
            }
            return resp.status(building.status).json({ message: building.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do prédio não encontrado' });
        }
    }

    async delete(req: Request, resp: Response) {
        const { id } = req.params;

        const buildingService = new BuildingService();
        try {
            const building = await buildingService.delete(id);
            return resp.status(building.status).json({ message: building.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do prédio não encontrado' });
        }
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params;
        const { name, latitude, longitude , description, organization_id } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            latitude: yup.number().required('Latitude é obrigatória'),
            longitude: yup.number().required('Longitude é obrigatória'),
            description: yup.string().required('Descrição é obrigatória'),
            organization_id: yup.string().required('Id da Organização é obrigatória')
        })
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const buildingService = new BuildingService();
        try {
            const building = await buildingService.update(id, name, latitude, longitude, description, organization_id);
            return resp.status(building.status).json({ message: building.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id da prédio não encontrado' });
        }
    }
}

export { BuildingController }