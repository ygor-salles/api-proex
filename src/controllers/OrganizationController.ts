import { Request, Response } from "express";
import * as yup from 'yup';
import httpStatus from "http-status";
import { OrganizationService } from "../services/OrganizationService";

class OrganizationController {
    async create(req: Request, resp: Response) {
        // Dados recebidos na requisição
        const { name, cep, state, district, city, street, number, description } = req.body;

        // Validação dos campos recebidos no corpo da requisição
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            cep: yup.string().required('Cep é obrigatório'),
            state: yup.string().required('Estado é obrigatório'),
            district: yup.string().required('Bairro é obrigatório'),
            city: yup.string().required('Cidade é obrigatório'),
            street: yup.string().required('Rua é obrigatório'),
            number: yup.string().required('Número é obrigatório'),
            description: yup.string().required('Descrição é obrigatória')
        });
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        // Conexão com o banco de dados chamando a service
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
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async delete(req: Request, resp: Response) {
        const { id } = req.params;

        const organizationService = new OrganizationService();
        try {
            const organization = await organizationService.delete(id);
            return resp.status(organization.status).json({ message: organization.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params;
        const { name, cep, state, district, city, street, number, description } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            cep: yup.string().required('Cep é obrigatório'),
            state: yup.string().required('Estado é obrigatório'),
            district: yup.string().required('Bairro é obrigatório'),
            city: yup.string().required('Cidade é obrigatório'),
            street: yup.string().required('Rua é obrigatório'),
            number: yup.string().required('Número é obrigatório'),
            description: yup.string().required('Descrição é obrigatória'),
        })
        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }

        const organizationService = new OrganizationService()
        try {
            const organization = await organizationService.update(id, name, cep, state, district, city, street, number, description);
            return resp.status(organization.status).json({ message: organization.message });
        } catch (error) {
            return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Falha de conexão com o banco de dados' });
        }
    }
}

export { OrganizationController }