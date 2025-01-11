import { Router } from 'express';
import { EnviosRoutes } from './routes/envios.routes';
import { ViajesRoutes } from './routes/viajes.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/envios', EnviosRoutes.routes);
    router.use('/api/viajes', ViajesRoutes.routes);

    return router;
  }
}