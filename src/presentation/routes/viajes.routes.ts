import { Router } from 'express';
import { viajesController } from '../../infrastructure/dependencies/container.dependency';

export class ViajesRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/all/conductor/:idConductor', viajesController.getAllByConductorId);
    router.get('/idViaje/:idViaje', viajesController.getViaje);
    router.get('/idCondcutor/:idConductor', viajesController.getViajeActual);
    router.post('/solicitarAmbulancia/:idViaje', viajesController.solicitarAmbulancia);

    return router;
  }
};