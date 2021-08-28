import { getCustomRepository, Repository } from 'typeorm';
import { Map } from '../entities/Map';
import { MapRepository } from '../repositories/MapRepository';
import httpStatus from 'http-status';

class MapService {
    private connectMap: Repository<Map>;
    constructor() {
        this.connectMap = getCustomRepository(MapRepository);
    }

    async create(name: string, source: string, description: string, building_id: string) {
        try {
            const mapExist = await this.connectMap.findOne({ name });
            if (mapExist) {
                return { status: httpStatus.BAD_REQUEST, message: 'Mapa já existe' };
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

    async ready() {
        try {
            return await this.connectMap.find();
        } catch (error) {
            throw error;
        }
    }

    async readyById(id: string) {
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