import { getCustomRepository, Repository } from 'typeorm';
import { Building } from '../entities/Building';
import { BuildingRepository } from '../repositories/BuildingRepository';
import { Organization } from '../entities/Organization';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { ApiError } from '../exceptions/ApiError';

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
    const buildingExist = await this.connectBuilding.findOne({ name });
    if (buildingExist) {
      throw new ApiError(400, 'Prédio já existe');
    }

    const fkOrganization = await this.connectOrganization.findOne({ id: organization_id });
    if (!fkOrganization) {
      throw new ApiError(404, 'Id de organização não existe');
    }

    const building = this.connectBuilding.create({
      name,
      latitude,
      longitude,
      description,
      organization_id,
    });
    await this.connectBuilding.save(building);

    return building;
  }

  async read() {
    const allBuindings = await this.connectBuilding.find();
    return allBuindings;
  }

  async readById(id: string) {
    const building = await this.connectBuilding.findOne({ id });
    if (!building) {
      throw new ApiError(404, 'Prédio não existe');
    }
    return building;
  }

  async delete(id: string) {
    const building = await this.connectBuilding.findOne({ id });
    if (!building) {
      throw new ApiError(404, 'Prédio não existe!');
    }
    await this.connectBuilding.delete(building.id);
  }

  async update(
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    description: string,
    organization_id: string,
  ) {
    const building = await this.connectBuilding.findOne({ id });
    if (!building) {
      throw new ApiError(404, 'Prédio não existe!');
    }

    const fkOrganization = await this.connectOrganization.findOne({ id: organization_id });
    if (!fkOrganization) {
      throw new ApiError(404, 'Id de organização não existe');
    }

    await this.connectBuilding.update(building.id, {
      name,
      latitude,
      longitude,
      description,
      organization_id,
    });
  }
}

export { BuildingService };
