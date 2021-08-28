import { getCustomRepository, Repository } from 'typeorm';
import { Building } from '../entities/Building';
import { BuildingRepository } from '../repositories/BuildingRepository';
import httpStatus from 'http-status';   

class BuildingService {
    private connectBuilding: Repository<Building>;
    constructor() {
        this.connectBuilding = getCustomRepository(BuildingRepository);
    }

    async create(name: string, latitude: number, longitude: number, description: string) {
        try {
            const buildingExist = await this.connectBuilding.findOne({ name });
            if (buildingExist) {
                return { status: httpStatus.BAD_REQUEST, message: 'Prédio já existe' };
            }
            const building = this.connectBuilding.create({ 
                name, 
                latitude,
                longitude,
                description
            });
            await this.connectBuilding.save(building);

            return { status: httpStatus.CREATED, obj: building };
        } catch (error) {
            throw error;
        }
    }

    async ready() {
        try {
            return await this.connectBuilding.find();
        } catch (error) {
            throw error;
        }
    }

    async readyById(id: string) {
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

    async update(id: string, name: string, latitude: number, longitude: number, description: string) {
        try {
            const building = await this.connectBuilding.findOne({ id });
            if (building) {
                await this.connectBuilding.update(building.id, { name, latitude, longitude, description });
                return { status: httpStatus.OK, message: 'Prédio atualizado com sucesso!' };
            }
            return { status: httpStatus.NOT_FOUND, message: 'Prédio não existe!' };
        } catch (error) {
            throw error;
        }
    }
}

export { BuildingService }