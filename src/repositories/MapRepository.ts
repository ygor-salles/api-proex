import { EntityRepository, Repository } from 'typeorm';
import { Map } from '../entities/Map';

@EntityRepository(Map)
class MapRepository extends Repository<Map> { }

export { MapRepository };
