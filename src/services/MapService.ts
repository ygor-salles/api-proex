import { getCustomRepository, Repository } from 'typeorm';
import { Map } from '../entities/Map';
import { MapRepository } from '../repositories/MapRepository';
import { Building } from '../entities/Building';
import { BuildingRepository } from '../repositories/BuildingRepository';
import { ApiError } from '../exceptions/ApiError';

class MapService {
  private connectMap: Repository<Map>;

  private connectBuilding: Repository<Building>;

  constructor() {
    this.connectMap = getCustomRepository(MapRepository);
    this.connectBuilding = getCustomRepository(BuildingRepository);
  }

  async create(name: string, source: string, description: string, building_id: string) {
    const mapExist = await this.connectMap.findOne({ name });
    if (mapExist) {
      throw new ApiError(400, 'Mapa já existe');
    }

    const fkBuilding = await this.connectBuilding.findOne({ id: building_id });
    if (!fkBuilding) {
      throw new ApiError(404, 'Id de prédio não existe');
    }

    const map = this.connectMap.create({
      name,
      source,
      description,
      building_id,
    });
    await this.connectMap.save(map);

    return map;
  }

  async read() {
    const allMaps = await this.connectMap.find();
    return allMaps;
  }

  async readById(id: string) {
    const map = await this.connectMap.findOne({ id });
    if (!map) {
      throw new ApiError(404, 'Mapa não existe!');
    }
    return map;
  }

  async delete(id: string) {
    const map = await this.connectMap.findOne({ id });
    if (!map) {
      throw new ApiError(404, 'Mapa não existe!');
    }
    await this.connectMap.delete(map.id);
  }

  async update(id: string, name: string, source: string, description: string, building_id: string) {
    const map = await this.connectMap.findOne({ id });
    if (!map) {
      throw new ApiError(404, 'Mapa não existe!');
    }
    const fkBuilding = await this.connectBuilding.findOne({ id: building_id });
    if (!fkBuilding) {
      throw new ApiError(404, 'Id de prédio não existe');
    }

    await this.connectMap.update(map.id, { name, source, description, building_id });
  }
}

export { MapService };
