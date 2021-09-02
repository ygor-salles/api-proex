import { Request, Response, Router } from "express";

import { ensureSuper } from "./middlewares/ensureSuper";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { UserController } from "./controllers/UserController";
import { MapController } from "./controllers/MapController";
import { BuildingController } from "./controllers/BuildingController";
import { OrganizationController } from "./controllers/OrganizationController";
import { PointController } from "./controllers/PointController";

const router = Router();

const userController = new UserController();
const mapController = new MapController();
const buildingController = new BuildingController();
const organizationController = new OrganizationController();
const authenticateUserController = new AuthenticateUserController();
const pointController = new PointController();

router.get('/', (req: Request, resp: Response) => { 
    return resp.status(200).json({ message: 'Bem vindo api-proex' }); 
});

router.post('/users', ensureAuthenticated, ensureSuper, userController.create);
router.get('/users', ensureAuthenticated, userController.ready);
router.get('/users/:id', ensureAuthenticated, userController.readyById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.update);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.delete);

router.post('/maps', ensureAuthenticated, ensureSuper, mapController.create);
router.get('/maps', ensureAuthenticated, mapController.ready);
router.get('/maps/:id', ensureAuthenticated, mapController.readyById);
router.put('/maps/:id', ensureAuthenticated, ensureSuper, mapController.update);
router.delete('/maps/:id', ensureAuthenticated, ensureSuper, mapController.delete);

router.post('/buildings', ensureAuthenticated, ensureSuper, buildingController.create);
router.get('/buildings', ensureAuthenticated, buildingController.ready);
router.get('/buildings/:id', ensureAuthenticated, buildingController.readyById);
router.put('/buildings/:id', ensureAuthenticated, ensureSuper, buildingController.update);
router.delete('/buildings/:id', ensureAuthenticated, ensureSuper, buildingController.delete);

router.post('/organizations', ensureAuthenticated, ensureSuper, organizationController.create);
router.get('/organizations', ensureAuthenticated, organizationController.ready);
router.get('/organizations/:id', ensureAuthenticated, organizationController.readyById);
router.put('/organizations/:id', ensureAuthenticated, ensureSuper, organizationController.update);
router.delete('/organizations/:id', ensureAuthenticated, ensureSuper, organizationController.delete);

router.post('/points', ensureAuthenticated, ensureSuper, pointController.create);
router.get('/points', ensureAuthenticated, pointController.ready);
router.get('/points/:id', ensureAuthenticated, pointController.readyById);
router.put('/points/:id', ensureAuthenticated, ensureSuper, pointController.update);
router.delete('/points/:id', ensureAuthenticated, ensureSuper, pointController.delete);

router.post('/login', authenticateUserController.handle);

export default router