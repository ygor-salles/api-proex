import { getCustomRepository, Repository } from 'typeorm';
import { Organization } from '../entities/Organization';
import { ApiError } from '../exceptions/ApiError';
import { IOrganization } from '../interfaces/IOrganization.interface';
import { OrganizationRepository } from '../repositories/OrganizationRepository';

class OrganizationService {
  private connectOrganization: Repository<Organization>;

  constructor() {
    this.connectOrganization = getCustomRepository(OrganizationRepository);
  }

  async create(data: IOrganization) {
    const organizationExist = await this.connectOrganization.findOne({ name: data.name });
    if (organizationExist) {
      throw new ApiError(400, 'Organização já existe');
    }
    const organization = this.connectOrganization.create(data);
    await this.connectOrganization.save(organization);

    return organization;
  }

  async read() {
    const allOrganizzations = await this.connectOrganization.find({ relations: ['buildings'] });
    return allOrganizzations;
  }

  async readById(id: string) {
    const organization = await this.connectOrganization.findOne({ id });
    if (!organization) {
      throw new ApiError(404, 'Organização não existe!');
    }
    return organization;
  }

  async delete(id: string) {
    const organization = await this.connectOrganization.findOne({ id });
    if (!organization) {
      throw new ApiError(404, 'Organização não existe!');
    }
    await this.connectOrganization.delete(organization.id);
  }

  async update(data: IOrganization, id: string) {
    const organization = await this.connectOrganization.findOne({ id });
    if (!organization) {
      throw new ApiError(404, 'Organização não existe!');
    }
    await this.connectOrganization.update(organization.id, data);
  }
}

export { OrganizationService };
