import { getCustomRepository, Repository } from 'typeorm';
import { Organization } from '../entities/Organization';
import { ApiError } from '../exceptions/ApiError';
import { OrganizationRepository } from '../repositories/OrganizationRepository';

class OrganizationService {
  private connectOrganization: Repository<Organization>;

  constructor() {
    this.connectOrganization = getCustomRepository(OrganizationRepository);
  }

  async create(
    name: string,
    cep: string,
    state: string,
    district: string,
    city: string,
    street: string,
    number: number,
    description: string,
  ) {
    const organizationExist = await this.connectOrganization.findOne({ name });
    if (organizationExist) {
      throw new ApiError(400, 'Organização já existe');
    }
    const organization = this.connectOrganization.create({
      name,
      cep,
      state,
      district,
      city,
      street,
      number,
      description,
    });
    await this.connectOrganization.save(organization);

    return organization;
  }

  async read() {
    const allOrganizzations = await this.connectOrganization.find();
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

  async update(
    id: string,
    name: string,
    cep: string,
    state: string,
    district: string,
    city: string,
    street: string,
    number: number,
    description: string,
  ) {
    const organization = await this.connectOrganization.findOne({ id });
    if (!organization) {
      throw new ApiError(404, 'Organização não existe!');
    }
    await this.connectOrganization.update(organization.id, {
      name,
      cep,
      state,
      district,
      city,
      street,
      number,
      description,
    });
  }
}

export { OrganizationService };
