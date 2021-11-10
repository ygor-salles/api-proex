import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { IBuilding } from '../interfaces/IBuilding.interface';
import { BuildingService } from '../services/BuildingService';
import { BuildingDto } from '../validators/BuildingDto';

class BuildingController {
  async create(req: Request, resp: Response) {
    const { ...data }: IBuilding = req.body;

    const buildingDto = new BuildingDto();
    try {
      await buildingDto.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const buildingService = new BuildingService();
    const building = await buildingService.create(data);
    return resp.status(201).json(building);
  }

  async read(req: Request, resp: Response) {
    const buildingService = new BuildingService();
    const allBuildings = await buildingService.read();
    return resp.json(allBuildings);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const buildingDto = new BuildingDto();
    try {
      await buildingDto.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const buildingService = new BuildingService();
    const building = await buildingService.readById(id);
    return resp.json(building);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const buildingDto = new BuildingDto();
    try {
      await buildingDto.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const buildingService = new BuildingService();
    await buildingService.delete(id);
    return resp.status(200).json({ message: 'Prédio removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { ...data }: IBuilding = req.body;

    const buildingDto = new BuildingDto();
    try {
      await buildingDto.updateValidation().validate({ ...data, id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const buildingService = new BuildingService();
    await buildingService.update(data, id);
    return resp.status(200).json({ message: 'Prédio atualizado com sucesso!' });
  }
}

export { BuildingController };
