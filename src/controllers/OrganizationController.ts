import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { OrganizationService } from '../services/OrganizationService';
import { OrganizationDto } from '../validators/OrganizationDto';

class OrganizationController {
  async create(req: Request, resp: Response) {
    const { name, cep, state, district, city, street, number, description } = req.body;

    const organizationValidator = new OrganizationDto();
    try {
      await organizationValidator
        .createUpdateValidation()
        .validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const organizationService = new OrganizationService();
    const organization = await organizationService.create(
      name,
      cep,
      state,
      district,
      city,
      street,
      number,
      description,
    );
    return resp.status(201).json(organization);
  }

  async read(req: Request, resp: Response) {
    const organizationService = new OrganizationService();
    const allOrganizations = await organizationService.read();
    return resp.json(allOrganizations);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const organizationService = new OrganizationService();
    const organization = await organizationService.readById(id);
    return resp.status(200).json(organization);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const organizationService = new OrganizationService();
    await organizationService.delete(id);
    return resp.status(200).json({ message: 'Organização removida com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, cep, state, district, city, street, number, description } = req.body;

    const organizationValidator = new OrganizationDto();
    try {
      await organizationValidator
        .createUpdateValidation()
        .validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const organizationService = new OrganizationService();
    await organizationService.update(
      id,
      name,
      cep,
      state,
      district,
      city,
      street,
      number,
      description,
    );
    return resp.status(200).json({ message: 'Organização atualizada com sucesso!' });
  }
}

export { OrganizationController };
