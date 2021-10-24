import { getCustomRepository, Repository } from 'typeorm';
import httpStatus from 'http-status';
import { Organization } from '../entities/Organization';
import { OrganizationRepository } from '../repositories/OrganizationRepository';

class OrganizationService {
  // eslint-disable-next-line prettier/prettier
  private connectOrganization: Repository<Organization>;

  constructor() {
    this.connectOrganization = getCustomRepository(OrganizationRepository);
  }

  async create(name: string, cep: string, state: string, district: string, city: string, street: string, number: number, description: string) {
    try {
      const organizationExist = await this.connectOrganization.findOne({ name });
      if (organizationExist) {
        return { status: httpStatus.BAD_REQUEST, message: 'Organização já existe' };
      }
      const organization = this.connectOrganization.create({
        name,
        cep,
        state,
        district,
        city,
        street,
        number,
        description
      });
      await this.connectOrganization.save(organization);

      return { status: httpStatus.CREATED, obj: organization };
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      return await this.connectOrganization.find();
    } catch (error) {
      throw error;
    }
  }

  async readById(id: string) {
    try {
      const organization = await this.connectOrganization.findOne({ id });

      return { status: httpStatus.OK, obj: organization };

    } catch (error) {
      return { status: httpStatus.NOT_FOUND, message: 'Organização não existe!' };
    }
  }

  async delete(id: string) {
    try {
      const organization = await this.connectOrganization.findOne({ id });
      if (organization) {
        await this.connectOrganization.delete(organization.id);
        return { status: httpStatus.OK, message: 'Organização removida com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Organização não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, name: string, cep: string, state: string, district: string, city: string, street: string, number: number, description: string) {
    try {
      const organization = await this.connectOrganization.findOne({ id });
      await this.connectOrganization.update(organization.id, { name, cep, state, district, city, street, number, description });
      return { status: httpStatus.OK, message: 'Organização atualizada com sucesso!' };

    } catch (error) {
      return { status: httpStatus.NOT_FOUND, message: 'Organização não existe!' };
    }
  }
}

export { OrganizationService }