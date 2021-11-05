import { getCustomRepository, Repository } from 'typeorm';
import httpStatus from 'http-status';
import { Point } from '../entities/Point';
import { Map } from '../entities/Map';
import { PointRepository } from '../repositories/PointRepository';
import { MapRepository } from '../repositories/MapRepository';

class PointService {
  private connectPoint: Repository<Point>;

  private connectMap: Repository<Map>;

  constructor() {
    this.connectPoint = getCustomRepository(PointRepository);
    this.connectMap = getCustomRepository(MapRepository);
  }

  async create(
    name: string,
    description: string,
    floor: number,
    altitude: number,
    latitude: number,
    longitude: number,
    isObstacle: boolean,
    map_id: string,
  ) {
    try {
      const pointExist = await this.connectPoint.findOne({ name });
      if (pointExist) {
        return { status: httpStatus.BAD_REQUEST, message: 'Ponto já existe' };
      }

      const fkMap = await this.connectMap.findOne({ id: map_id });
      if (!fkMap) {
        return { status: httpStatus.NOT_FOUND, message: 'Id de mapa não existe' };
      }

      const point = this.connectPoint.create({
        name,
        description,
        floor,
        altitude,
        latitude,
        longitude,
        isObstacle,
        map_id,
      });
      await this.connectPoint.save(point);

      return { status: httpStatus.CREATED, obj: point };
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      return await this.connectPoint.find();
    } catch (error) {
      throw error;
    }
  }

  async readById(id: string) {
    try {
      const point = await this.connectPoint.findOne({ id });
      if (point) {
        return { status: httpStatus.OK, obj: point };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Ponto não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const point = await this.connectPoint.findOne({ id });
      if (point) {
        await this.connectPoint.delete(point.id);
        return { status: httpStatus.OK, message: 'Ponto removido com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Ponto não existe!' };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    name: string,
    description: string,
    floor: number,
    altitude: number,
    latitude: number,
    longitude: number,
    isObstacle: boolean,
    map_id: string,
  ) {
    try {
      const point = await this.connectPoint.findOne({ id });
      if (point) {
        const fkMap = await this.connectMap.findOne({ id: map_id });
        if (!fkMap) {
          return { status: httpStatus.NOT_FOUND, message: 'Id de mapa não existe' };
        }

        await this.connectPoint.update(point.id, {
          name,
          description,
          floor,
          altitude,
          latitude,
          longitude,
          isObstacle,
          map_id,
        });
        return { status: httpStatus.OK, message: 'Ponto atualizado com sucesso!' };
      }
      return { status: httpStatus.NOT_FOUND, message: 'Ponto não existe!' };
    } catch (error) {
      throw error;
    }
  }
}

export { PointService };
