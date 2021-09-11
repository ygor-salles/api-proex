import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BuildingService } from '../services/BuildingService';
import { BuildingDto } from '../validators/BuildingDto';

class BuildingController {
  async create(req: Request, resp: Response) {
    const { name, latitude, longitude, description, organization_id } = req.body;

    const buildingValidator = new BuildingDto();
    try {
      await buildingValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const buildingService = new BuildingService();
    try {
      const building = await buildingService.create(
        name,
        latitude,
        longitude,
        description,
        organization_id,
      );
      if (building.status === httpStatus.CREATED) {
        return resp.status(httpStatus.CREATED).json(building.obj);
      }
      return resp.status(building.status).json({ message: building.message });
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async read(req: Request, resp: Response) {
    const buildingService = new BuildingService();
    try {
      const allBuildings = await buildingService.read();
      return resp.json(allBuildings);
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const buildingService = new BuildingService();
    try {
      const building = await buildingService.readById(id);
      if (building.status === httpStatus.OK) {
        return resp.json(building.obj);
      }
      return resp.status(building.status).json({ message: building.message });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do prédio não encontrado' });
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const buildingService = new BuildingService();
    try {
      const building = await buildingService.delete(id);
      return resp.status(building.status).json({ message: building.message });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id do prédio não encontrado' });
    }
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, latitude, longitude, description, organization_id } = req.body;

    const buildingValidator = new BuildingDto();
    try {
      await buildingValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const buildingService = new BuildingService();
    try {
      const building = await buildingService.update(
        id,
        name,
        latitude,
        longitude,
        description,
        organization_id,
      );
      return resp.status(building.status).json({ message: building.message });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: 'Id da prédio não encontrado' });
    }
  }
}

export { BuildingController };
