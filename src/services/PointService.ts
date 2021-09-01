import { getCustomRepository, Repository } from 'typeorm';
import { Point } from '../entities/Point';
import { PointRepository } from '../repositories/PointRepository';
import httpStatus from 'http-status';

class PointService {
    private connectPoint: Repository<Point>;
    constructor() {
        this.connectPoint = getCustomRepository(PointRepository);
    }

    async create(name: string, description: string, floor: number,altitude: number, latitude: number, longitude: number, isObstacle: boolean, map_id: string) {
        try {
            const pointExist = await this.connectPoint.findOne({ name });
            if (pointExist) {
                return { status: httpStatus.BAD_REQUEST, message: 'Ponto já existe' };
            }
            const point = this.connectPoint.create({ 
                name, 
                description,
                floor,
                altitude,
                latitude,
                longitude,
                // isObstacle,
                map_id
            });
            await this.connectPoint.save(point);

            return { status: httpStatus.CREATED, obj: point };
        } catch (error) {
            throw error;
        }
    }

    async ready() {
        try {
            return await this.connectPoint.find();
        } catch (error) {
            throw error;
        }
    }

    async readyById(id: string) {
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

    async update(id: string, name: string, description: string, floor: number,altitude: number, latitude: number, longitude: number, isObstacle: boolean, map_id: string) {
        try {
            const point = await this.connectPoint.findOne({ id });
            if (point) {
                await this.connectPoint.update(point.id, { name, description, floor, altitude, latitude, longitude,/* isObstacle,*/ map_id });
                return { status: httpStatus.OK, message: 'Ponto atualizado com sucesso!' };
            }
            return { status: httpStatus.NOT_FOUND, message: 'Ponto não existe!' };
        } catch (error) {
            throw error;
        }
    }
}

export { PointService }