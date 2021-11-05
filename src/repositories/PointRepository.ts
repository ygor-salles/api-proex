import { EntityRepository, Repository } from 'typeorm';
import { Point } from '../entities/Point';

@EntityRepository(Point)
class PointRepository extends Repository<Point> {}

export { PointRepository };
