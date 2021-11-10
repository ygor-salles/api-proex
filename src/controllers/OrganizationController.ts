import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { IOrganization } from '../interfaces/IOrganization.interface';
import { OrganizationService } from '../services/OrganizationService';
import { OrganizationDto } from '../validators/OrganizationDto';

class OrganizationController {
  async create(req: Request, resp: Response) {
    const { ...data }: IOrganization = req.body;

    const organizationDto = new OrganizationDto();
    try {
      await organizationDto.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const organizationService = new OrganizationService();
    const organization = await organizationService.create(data);
    return resp.status(201).json(organization);
  }

  async read(req: Request, resp: Response) {
    const organizationService = new OrganizationService();
    const allOrganizations = await organizationService.read();
    return resp.json(allOrganizations);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const organizationDto = new OrganizationDto();
    try {
      await organizationDto.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const organizationService = new OrganizationService();
    const organization = await organizationService.readById(id);
    return resp.status(200).json(organization);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const organizationDto = new OrganizationDto();
    try {
      await organizationDto.deleteByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const organizationService = new OrganizationService();
    await organizationService.delete(id);
    return resp.status(200).json({ message: 'Organização removida com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { ...data }: IOrganization = req.body;

    const organizationDto = new OrganizationDto();
    try {
      await organizationDto.updateValidation().validate({ ...data, id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const organizationService = new OrganizationService();
    await organizationService.update(data, id);
    return resp.status(200).json({ message: 'Organização atualizada com sucesso!' });
  }
}

export { OrganizationController };
