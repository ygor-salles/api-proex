import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { IMap } from '../interfaces/IMap.interface';
import { MapService } from '../services/MapService';
import { MapDto } from '../validators/MapDto';

class MapController {
  async create(req: Request, resp: Response) {
    const { ...data }: IMap = req.body;

    const mapDto = new MapDto();
    try {
      await mapDto.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const mapService = new MapService();
    const map = await mapService.create(data);
    return resp.status(201).json(map);
  }

  async read(req: Request, resp: Response) {
    const mapService = new MapService();
    const allMaps = await mapService.read();
    return resp.json(allMaps);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const mapDto = new MapDto();
    try {
      await mapDto.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const mapService = new MapService();
    const map = await mapService.readById(id);
    return resp.json(map);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const mapDto = new MapDto();
    try {
      await mapDto.deleteByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const mapService = new MapService();
    await mapService.delete(id);
    return resp.status(200).json({ message: 'Mapa removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { ...data }: IMap = req.body;

    const mapDto = new MapDto();
    try {
      await mapDto.updateValidation().validate({ ...data, id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const mapService = new MapService();
    await mapService.update(data, id);
    return resp.status(200).json({ message: 'Mapa atualizado com sucesso!' });
  }
}

export { MapController };
