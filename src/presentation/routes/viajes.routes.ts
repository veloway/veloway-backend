import { Router } from 'express';
import { viajesController } from '../../infrastructure/dependencies/container.dependency';

export class ViajesRoutes {
  static get routes(): Router {
    const router = Router();

    router.post('/create', viajesController.create);
    router.get('/all/conductor/:idConductor', viajesController.getAllByConductorId);
    router.get('/idViaje/:idViaje', viajesController.getViaje);

    return router;
  }
};