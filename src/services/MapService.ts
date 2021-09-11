import { getCustomRepository, Repository } from 'typeorm';
import httpStatus from 'http-status';
import { Map } from '../entities/Map';
import { MapRepository } from '../repositories/MapRepository';
import { Building } from '../entities/Building';
import { BuildingRepository } from '../repositories/BuildingRepository';

class MapService {
  // eslint-disable-next-line prettier/prettier
  private connectMap: Repository<Map>;

  private connectBuilding: Repository<Building>;

  constructor() {
    this.connectMap = getCustomRepository(MapRepository);
    this.connectBuilding = getCustomRepository(BuildingRepository);
  }

  async create(name: string, source: string, description: string, building_id: string) {
    try {
      const mapExist = await this.connectMap.findOne({ name });
      if (mapExist) {
        return { status: httpStatus.BAD_REQUEST, message: 'Mapa já existe' };
      }

      const fkBuilding = await this.connectBuilding.findOne({ id: building_id });
      if (!fkBuilding) {
        return { status: httpStatus.NOT_FOUND, message: 'Id de prédio não existe' };
      }

      const map = this.connectMap.create({
        name,
        source,
        description,
        building_id
      });
      await this.connectMap.save(map);

      return { status: httpStatus.CREATED, obj: map };
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      return await this.connectMap.find();
    } catch (error) {
      throw error;
    }
  }

  async readById(id: string) {
    try {
      const map = await this.connectMap.findOne({ id });
      if (map) {
        return { status: httpStatus.OK, obj: map };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Mapa não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const map = await this.connectMap.findOne({ id });
      if (map) {
        await this.connectMap.delete(map.id);
        return { status: httpStatus.OK, message: 'Mapa removido com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Mapa não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, name: string, source: string, description: string, building_id: string) {
    try {
      const map = await this.connectMap.findOne({ id });
      if (map) {
        const fkBuilding = await this.connectBuilding.findOne({ id: building_id });
        if (!fkBuilding) {
          return { status: httpStatus.NOT_FOUND, message: 'Id de prédio não existe' };
        }

        await this.connectMap.update(map.id, { name, source, description, building_id });
        return { status: httpStatus.OK, message: 'Mapa atualizado com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Mapa não existe!' };
    } catch (error) {
      throw error;
    }
  }
}

export { MapService }