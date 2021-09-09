import { EntityRepository, Repository } from 'typeorm';
import { Point } from '../entities/Point';

@EntityRepository(Point)
// eslint-disable-next-line prettier/prettier
class PointRepository extends Repository<Point> { }

export { PointRepository };
