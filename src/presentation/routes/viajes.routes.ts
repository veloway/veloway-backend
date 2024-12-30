import { Router } from 'express';
import { viajesController } from '../../infrastructure/dependencies/viajes.dependencies';

export class ViajesRoutes {
  static get routes(): Router {
    const router = Router();

    router.post('create', viajesController.create);
    router.get('/all', viajesController.getAll);

    return router;
  }
}