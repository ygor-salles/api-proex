import { Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { IUser } from '../interfaces/IUser.interface';
import { UserService } from '../services/UserService';
import { UserValidator } from '../validators/UserValidator';

class UserController {
  async create(req: Request, resp: Response) {
    const { ...data }: IUser = req.body;

    const userValidator = new UserValidator();
    try {
      await userValidator.createValidation().validate(data, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const userService = new UserService();
    const user = await userService.create(data);
    return resp.status(201).json(user);
  }

  async read(req: Request, resp: Response) {
    const userService = new UserService();
    const allUsers = await userService.read();
    return resp.json(allUsers);
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const userValidator = new UserValidator();
    try {
      await userValidator.readByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const userService = new UserService();
    const user = await userService.readById(id);
    return resp.status(200).json(user);
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const userValidator = new UserValidator();
    try {
      await userValidator.deleteByIdValidation().validate({ id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const userService = new UserService();
    await userService.delete(id);
    return resp.status(200).json({ message: 'Usuário removido com sucesso!' });
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { ...data }: IUser = req.body;

    const userValidator = new UserValidator();
    try {
      await userValidator.updateValidation().validate({ ...data, id }, { abortEarly: false });
    } catch (error) {
      throw new ApiError(400, error.message);
    }

    const userService = new UserService();
    await userService.update(data, id);
    return resp.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  }
}

export { UserController };
