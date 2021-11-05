import { EntityRepository, Repository } from 'typeorm';
import { Building } from '../entities/Building';

@EntityRepository(Building)
class BuildingRepository extends Repository<Building> {}

export { BuildingRepository };
