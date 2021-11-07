import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { PointService } from '../services/PointService';
import { PointDto } from '../validators/PointDto';

class PointController {
  async create(req: Request, resp: Response) {
    const { name, description, floor, altitude, latitude, longitude, isObstacle, map_id } =
      req.body;

    const pointValidator = new PointDto();
    try {
      await pointValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const pointService = new PointService();
    const point = await pointService.create(
      name,
      description,
      floor,
      altitude,
      latitude,
      longitude,
      isObstacle,
      map_id,
    );
    return resp.status(201).json(point);
  }

  async read(req: Request, resp: Response) {
    const pointService = new PointService();
    const allPoints = await pointService.read();
    return resp.json(allPoints);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const pointService = new PointService();
    const point = await pointService.readById(id);
    return resp.status(200).json(point);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const pointService = new PointService();
    await pointService.delete(id);
    return resp.status(200).json({ message: 'Ponto removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, description, floor, altitude, latitude, longitude, isObstacle, map_id } =
      req.body;

    const pointValidator = new PointDto();
    try {
      await pointValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const pointService = new PointService();
    await pointService.update(
      id,
      name,
      description,
      floor,
      altitude,
      latitude,
      longitude,
      isObstacle,
      map_id,
    );
    return resp.status(200).json({ message: 'Ponto atualizado com sucesso!' });
  }
}

export { PointController };
