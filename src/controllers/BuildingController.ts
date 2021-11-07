import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { BuildingService } from '../services/BuildingService';
import { BuildingDto } from '../validators/BuildingDto';

class BuildingController {
  async create(req: Request, resp: Response) {
    const { name, latitude, longitude, description, organization_id } = req.body;

    const buildingValidator = new BuildingDto();
    try {
      await buildingValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const buildingService = new BuildingService();
    const building = await buildingService.create(
      name,
      latitude,
      longitude,
      description,
      organization_id,
    );
    return resp.status(201).json(building);
  }

  async read(req: Request, resp: Response) {
    const buildingService = new BuildingService();
    const allBuildings = await buildingService.read();
    return resp.json(allBuildings);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const buildingService = new BuildingService();
    const building = await buildingService.readById(id);
    return resp.json(building);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const buildingService = new BuildingService();
    await buildingService.delete(id);
    return resp.status(200).json({ message: 'Prédio removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, latitude, longitude, description, organization_id } = req.body;

    const buildingValidator = new BuildingDto();
    try {
      await buildingValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const buildingService = new BuildingService();
    await buildingService.update(id, name, latitude, longitude, description, organization_id);
    return resp.status(200).json({ message: 'Prédio atualizado com sucesso!' });
  }
}

export { BuildingController };
