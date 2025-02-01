import { Router } from 'express';
import { condutorController } from '../../infrastructure/dependencies/container.dependency';

export class ConductoresRoutes {
  static get routes(): Router {
    const router = Router();

    router.post('/register', condutorController.register);

    return router;
  }
};