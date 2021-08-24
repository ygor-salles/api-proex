import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { UserController } from "./controllers/UserController";
import { ensureSuper } from "./middlewares/ensureSuper";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();

router.get('/', (req: Request, resp: Response) => { 
    return resp.status(200).json({ message: 'Welcome api-proex' }); 
});

router.post('/users', ensureAuthenticated, ensureSuper, userController.create);
router.get('/users', ensureAuthenticated, userController.ready);
router.get('/users/:id', ensureAuthenticated, userController.readyById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.update);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.delete);

router.post('/login', authenticateUserController.handle);

export default router