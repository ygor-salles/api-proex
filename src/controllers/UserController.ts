import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { UserService } from '../services/UserService';
import { UserDto } from '../validators/UserDto';

class UserController {
  async create(req: Request, resp: Response) {
    const { name, email, password, role } = req.body;

    const userValidator = new UserDto();
    try {
      await userValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const userService = new UserService();
    const user = await userService.create(name, email, password, role);
    return resp.status(201).json(user);
  }

  async read(req: Request, resp: Response) {
    const userService = new UserService();
    const allUsers = await userService.read();
    return resp.json(allUsers);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const userService = new UserService();
    const user = await userService.readById(id);
    return resp.status(200).json(user);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const userService = new UserService();
    await userService.delete(id);
    return resp.status(200).json({ message: 'Usuário removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const userValidator = new UserDto();
    try {
      await userValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const userService = new UserService();
    await userService.update(id, name, email, password, role);
    return resp.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  }
}

export { UserController };
