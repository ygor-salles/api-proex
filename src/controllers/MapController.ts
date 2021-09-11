import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MapService } from '../services/MapService';
import { MapDto } from '../validators/MapDto';

class MapController {
  async create(req: Request, resp: Response) {
    const { name, source, description, building_id } = req.body;

    const mapValidator = new MapDto();
    try {
      await mapValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const mapService = new MapService();
    try {
      const map = await mapService.create(name, source, description, building_id);
      if (map.status === httpStatus.CREATED) {
        return resp.status(httpStatus.CREATED).json(map.obj);
      }
      return resp.status(map.status).json({ message: map.message });
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async read(req: Request, resp: Response) {
    const mapService = new MapService();
    try {
      const allMaps = await mapService.read();
      return resp.json(allMaps);
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const mapService = new MapService();
    try {
      const map = await mapService.readById(id);
      if (map.status === httpStatus.OK) {
        return resp.json(map.obj);
      }
      return resp.status(map.status).json({ message: map.message });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do mapa não encontrado' });
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const mapService = new MapService();
    try {
      const map = await mapService.delete(id);
      return resp.status(map.status).json({ message: map.message });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do mapa não encontrado' });
    }
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, source, description, building_id } = req.body;

    const mapValidator = new MapDto();
    try {
      await mapValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const mapService = new MapService();
    try {
      const map = await mapService.update(id, name, source, description, building_id);
      return resp.status(map.status).json({ message: map.message });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do mapa não encontrado' });
    }
  }
}

export { MapController };
