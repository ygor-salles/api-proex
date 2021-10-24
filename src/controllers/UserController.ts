import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from '../services/UserService';
import { UserDto } from '../validators/UserDto';

class UserController {
  async create(req: Request, resp: Response) {
    const { name, email, password, role } = req.body;

    const userValidator = new UserDto();
    try {
      await userValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const userService = new UserService();
    try {
      const user = await userService.create(name, email, password, role);
      if (user.status === httpStatus.CREATED) {
        return resp.status(httpStatus.CREATED).json(user.obj);
      }
      return resp.status(user.status).json({ message: user.message });
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async read(req: Request, resp: Response) {
    const userService = new UserService();
    try {
      const allUsers = await userService.read();
      return resp.json(allUsers);
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async readById(req: Request, resp: Response) {
    const { id } = req.params;

    const userService = new UserService();
    try {
      const user = await userService.readById(id);
      if (user.status === httpStatus.OK) {
        return resp.json(user.obj);
      }
      return resp.status(user.status).json({ message: user.message });
    } catch (error) {
      return resp.status(httpStatus.NOT_FOUND).json({ message: 'Usuário não existe!' });
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    const userService = new UserService();
    try {
      const user = await userService.delete(id);
      return resp.status(user.status).json({ message: user.message });
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }

  async update(req: Request, resp: Response) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const userValidator = new UserDto();
    try {
      await userValidator.createUpdateValidation().validate(req.body, { abortEarly: false });
    } catch (error) {
      return resp.status(httpStatus.BAD_REQUEST).json({ message: error.message });
    }

    const userService = new UserService();
    try {
      const user = await userService.update(id, name, email, password, role);
      return resp.status(user.status).json({ message: user.message });
    } catch (error) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Falha de conexão com o banco de dados' });
    }
  }
}

export { UserController };
