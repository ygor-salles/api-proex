import { Request, Response, Router } from 'express';

import { ensureSuper } from './middlewares/ensureSuper';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { UserController } from './controllers/UserController';
import { MapController } from './controllers/MapController';
import { BuildingController } from './controllers/BuildingController';
import { OrganizationController } from './controllers/OrganizationController';
import { PointController } from './controllers/PointController';
import { ForgotPasswordController } from './controllers/ForgotPasswordController';
import { ChangePasswordController } from './controllers/ChangePasswordController';

const router = Router();

const userController = new UserController();
const mapController = new MapController();
const buildingController = new BuildingController();
const organizationController = new OrganizationController();
const authenticateUserController = new AuthenticateUserController();
const pointController = new PointController();
const forgotPasswordController = new ForgotPasswordController();
const changePasswordControler = new ChangePasswordController();

router.get('/', (req: Request, resp: Response) =>
  resp.status(200).json({ message: 'Welcome api-proex' }),
);

// router.post('/users', ensureAuthenticated, ensureSuper, userController.create);
router.post('/users', userController.create);
router.get('/users', ensureAuthenticated, userController.read);
router.get('/users/:id', ensureAuthenticated, userController.readById);
router.put('/users/:id', ensureAuthenticated, ensureSuper, userController.update);
router.delete('/users/:id', ensureAuthenticated, ensureSuper, userController.delete);

router.post('/maps', ensureAuthenticated, ensureSuper, mapController.create);
router.get('/maps', ensureAuthenticated, mapController.read);
router.get('/maps/:id', ensureAuthenticated, mapController.readById);
router.put('/maps/:id', ensureAuthenticated, ensureSuper, mapController.update);
router.delete('/maps/:id', ensureAuthenticated, ensureSuper, mapController.delete);

router.post('/buildings', ensureAuthenticated, ensureSuper, buildingController.create);
router.get('/buildings', ensureAuthenticated, buildingController.read);
router.get('/buildings/:id', ensureAuthenticated, buildingController.readById);
router.put('/buildings/:id', ensureAuthenticated, ensureSuper, buildingController.update);
router.delete('/buildings/:id', ensureAuthenticated, ensureSuper, buildingController.delete);

// router.post('/organizations', ensureAuthenticated, ensureSuper, organizationController.create);
router.post('/organizations', organizationController.create);
router.get('/organizations', ensureAuthenticated, organizationController.read);
router.get('/organizations/:id', ensureAuthenticated, organizationController.readById);
router.put('/organizations/:id', ensureAuthenticated, ensureSuper, organizationController.update);
router.delete(
  '/organizations/:id',
  ensureAuthenticated,
  ensureSuper,
  organizationController.delete,
);

router.post('/points', ensureAuthenticated, ensureSuper, pointController.create);
router.get('/points', ensureAuthenticated, pointController.read);
router.get('/points/:id', ensureAuthenticated, pointController.readById);
router.put('/points/:id', ensureAuthenticated, ensureSuper, pointController.update);
router.delete('/points/:id', ensureAuthenticated, ensureSuper, pointController.delete);

router.post('/login', authenticateUserController.handle);
router.post('/forgot-password', forgotPasswordController.handle);
router.post('/change-password', changePasswordControler.handle);

export { router };
