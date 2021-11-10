import { getCustomRepository, Repository } from 'typeorm';
import { Building } from '../entities/Building';
import { BuildingRepository } from '../repositories/BuildingRepository';
import { Organization } from '../entities/Organization';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { ApiError } from '../exceptions/ApiError';
import { IBuilding } from '../interfaces/IBuilding.interface';

class BuildingService {
  private connectBuilding: Repository<Building>;

  private connectOrganization: Repository<Organization>;

  constructor() {
    this.connectBuilding = getCustomRepository(BuildingRepository);
    this.connectOrganization = getCustomRepository(OrganizationRepository);
  }

  async create(data: IBuilding) {
    const buildingExist = await this.connectBuilding.findOne({ name: data.name });
    if (buildingExist) {
      throw new ApiError(400, 'Prédio já existe');
    }

    const fkOrganization = await this.connectOrganization.findOne({ id: data.organization_id });
    if (!fkOrganization) {
      throw new ApiError(404, 'Id de organização não existe');
    }

    const building = this.connectBuilding.create(data);
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
      throw new ApiError(404, 'Prédio não existe!');
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

  async update(data: IBuilding, id: string) {
    const building = await this.connectBuilding.findOne({ id });
    if (!building) {
      throw new ApiError(404, 'Prédio não existe!');
    }

    const fkOrganization = await this.connectOrganization.findOne({ id: data.organization_id });
    if (!fkOrganization) {
      throw new ApiError(404, 'Id de organização não existe');
    }

    await this.connectBuilding.update(building.id, data);
  }
}

export { BuildingService };
