import { Request, Response } from "express";
import httpStatus from "http-status";
import { OrganizationService } from "../services/OrganizationService";
import { OrganizationDto } from "../validators/OrganizationDto";

class OrganizationController {
    async create(req: Request, resp: Response) {
        const { name, cep, state, district, city, street, number, description } = req.body;

        const organizationValidator = new OrganizationDto();        
        try {
            await organizationValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const organizationService = new OrganizationService();
        try {
            const organization = await organizationService.create(name, cep, state, district, city, street, number, description);
            if(organization.status === httpStatus.CREATED){
                return resp.status(httpStatus.CREATED).json(organization.obj);
            } else {
                return resp.status(organization.status).json({message: organization.message});
            }            
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }

    }

    async ready(req: Request, resp: Response) {
        const organizationService = new OrganizationService();
        try {
            const allOrganizations = await organizationService.ready();
            return resp.json(allOrganizations);
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async readyById(req: Request, resp: Response) {
        const { id } = req.params;
        
        const organizationService = new OrganizationService();
        try {
            const organization = await organizationService.readyById(id);
            if(organization.status === httpStatus.OK){
                return resp.json(organization.obj);
            }
            return resp.status(organization.status).json({ message: organization.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id da organização não encontrado' });
        }
    }

    async delete(req: Request, resp: Response) {
        const { id } = req.params;

        const organizationService = new OrganizationService();
        try {
            const organization = await organizationService.delete(id);
            return resp.status(organization.status).json({ message: organization.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id da organização não encontrado' });
        }
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params;
        const { name, cep, state, district, city, street, number, description } = req.body;

        const organizationValidator = new OrganizationDto();
        try {
            await organizationValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const organizationService = new OrganizationService()
        try {
            const organization = await organizationService.update(id, name, cep, state, district, city, street, number, description);
            return resp.status(organization.status).json({ message: organization.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id da organização não encontrado' });
        }
    }
}

export { OrganizationController }