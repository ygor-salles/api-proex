import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { IMap } from '../interfaces/IMap.interface';
import { MapService } from '../services/MapService';
import { MapValidator } from '../validators/MapValidator';

class MapController {
  async create(req: Request, resp: Response) {
    const { ...data }: IMap = req.body;

    const mapValidaMapValidator = new MapValidator();
    try {
      await mapValidaMapValidator.createValidation().validate(data, { abortEarly: false });
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

    const mapValidaMapValidator = new MapValidator();
    try {
      await mapValidaMapValidator.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const mapService = new MapService();
    const map = await mapService.readById(id);
    return resp.json(map);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const mapValidaMapValidator = new MapValidator();
    try {
      await mapValidaMapValidator.deleteByIdValidation().validate({ id }, { abortEarly: false });
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

    const mapValidaMapValidator = new MapValidator();
    try {
      await mapValidaMapValidator
        .updateValidation()
        .validate({ ...data, id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const mapService = new MapService();
    await mapService.update(data, id);
    return resp.status(200).json({ message: 'Mapa atualizado com sucesso!' });
  }
}

export { MapController };
