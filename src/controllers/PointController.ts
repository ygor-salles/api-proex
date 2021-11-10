import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { IPoint } from '../interfaces/IPoint.interface';
import { PointService } from '../services/PointService';
import { PointDto } from '../validators/PointDto';

class PointController {
  async create(req: Request, resp: Response) {
    const { ...data }: IPoint = req.body;

    const pointDto = new PointDto();
    try {
      await pointDto.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const pointService = new PointService();
    const point = await pointService.create(data);
    return resp.status(201).json(point);
  }

  async read(req: Request, resp: Response) {
    const pointService = new PointService();
    const allPoints = await pointService.read();
    return resp.json(allPoints);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const pointDto = new PointDto();
    try {
      await pointDto.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const pointService = new PointService();
    const point = await pointService.readById(id);
    return resp.status(200).json(point);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const pointDto = new PointDto();
    try {
      await pointDto.deleteByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const pointService = new PointService();
    await pointService.delete(id);
    return resp.status(200).json({ message: 'Ponto removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { ...data }: IPoint = req.body;

    const pointDto = new PointDto();
    try {
      await pointDto.updateValidation().validate({ ...data, id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const pointService = new PointService();
    await pointService.update(data, id);
    return resp.status(200).json({ message: 'Ponto atualizado com sucesso!' });
  }
}

export { PointController };
