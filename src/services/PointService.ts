import { getCustomRepository, Repository } from 'typeorm';
import { Point } from '../entities/Point';
import { Map } from '../entities/Map';
import { PointRepository } from '../repositories/PointRepository';
import { MapRepository } from '../repositories/MapRepository';
import { ApiError } from '../exceptions/ApiError';

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
    const pointExist = await this.connectPoint.findOne({ name });
    if (pointExist) {
      throw new ApiError(400, 'Ponto já existe');
    }

    const fkMap = await this.connectMap.findOne({ id: map_id });
    if (!fkMap) {
      throw new ApiError(404, 'Id de mapa não existe');
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

    return point;
  }

  async read() {
    const allPoints = await this.connectPoint.find();
    return allPoints;
  }

  async readById(id: string) {
    const point = await this.connectPoint.findOne({ id });
    if (!point) {
      throw new ApiError(404, 'Ponto não existe!');
    }
    return point;
  }

  async delete(id: string) {
    const point = await this.connectPoint.findOne({ id });
    if (!point) {
      throw new ApiError(404, 'Ponto não existe!');
    }
    await this.connectPoint.delete(point.id);
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
    const point = await this.connectPoint.findOne({ id });
    if (!point) {
      throw new ApiError(404, 'Ponto não existe!');
    }
    const fkMap = await this.connectMap.findOne({ id: map_id });
    if (!fkMap) {
      throw new ApiError(404, 'Id de mapa não existe');
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
  }
}

export { PointService };
