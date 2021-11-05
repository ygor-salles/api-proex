import { getCustomRepository, Repository } from 'typeorm';
import httpStatus from 'http-status';
import { Building } from '../entities/Building';
import { BuildingRepository } from '../repositories/BuildingRepository';
import { Organization } from '../entities/Organization';
import { OrganizationRepository } from '../repositories/OrganizationRepository';

class BuildingService {
  private connectBuilding: Repository<Building>;

  private connectOrganization: Repository<Organization>;

  constructor() {
    this.connectBuilding = getCustomRepository(BuildingRepository);
    this.connectOrganization = getCustomRepository(OrganizationRepository);
  }

  async create(
    name: string,
    latitude: number,
    longitude: number,
    description: string,
    organization_id: string,
  ) {
    try {
      const buildingExist = await this.connectBuilding.findOne({ name });
      if (buildingExist) {
        return { status: httpStatus.BAD_REQUEST, message: 'Prédio já existe' };
      }

      const fkOrganization = await this.connectOrganization.findOne({ id: organization_id });
      if (!fkOrganization) {
        return { status: httpStatus.NOT_FOUND, message: 'Id de organização não existe' };
      }

      const building = this.connectBuilding.create({
        name,
        latitude,
        longitude,
        description,
        organization_id,
      });
      await this.connectBuilding.save(building);

      return { status: httpStatus.CREATED, obj: building };
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      return await this.connectBuilding.find();
    } catch (error) {
      throw error;
    }
  }

  async readById(id: string) {
    try {
      const building = await this.connectBuilding.findOne({ id });
      if (building) {
        return { status: httpStatus.OK, obj: building };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Prédio não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const building = await this.connectBuilding.findOne({ id });
      if (building) {
        await this.connectBuilding.delete(building.id);
        return { status: httpStatus.OK, message: 'Prédio removido com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Prédio não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    description: string,
    organization_id: string,
  ) {
    try {
      const building = await this.connectBuilding.findOne({ id });
      if (building) {
        const fkOrganization = await this.connectOrganization.findOne({ id: organization_id });
        if (!fkOrganization) {
          return { status: httpStatus.NOT_FOUND, message: 'Id de organização não existe' };
        }

        await this.connectBuilding.update(building.id, {
          name,
          latitude,
          longitude,
          description,
          organization_id,
        });
        return { status: httpStatus.OK, message: 'Prédio atualizado com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Prédio não existe!' };
    } catch (error) {
      throw error;
    }
  }
}

export { BuildingService };
