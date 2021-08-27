import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { UserController } from "./controllers/UserController";
import { MapController } from "./controllers/MapController";
import { ensureSuper } from "./middlewares/ensureSuper";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const userController = new UserController();
const mapController = new MapController();
const authenticateUserController = new AuthenticateUserController();

router.get('/', (req: Request, resp: Response) => { 
    return resp.status(200).json({ message: 'Bem vindo api-proex' }); 
});

router.post('/users', ensureAuthenticated, ensureSuper, userController.create);
router.get('/users', ensureAuthenticated, userController.ready);
router.get('/users/:id', ensureAuthenticated, userController.readyById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.update);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.delete);

router.post('/maps', ensureAuthenticated, ensureSuper, mapController.create);
router.get('/map', ensureAuthenticated, mapController.ready);
router.get('/map/:id', ensureAuthenticated, mapController.readyById);
router.put('/map/:id', ensureAuthenticated, ensureSuper, mapController.update);
router.delete('/map/:id', ensureAuthenticated, ensureSuper, mapController.delete);

router.post('/login', authenticateUserController.handle);

export default router