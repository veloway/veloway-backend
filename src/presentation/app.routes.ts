import { Router } from 'express';
import { EnviosRoutes } from './routes/envios.routes';
import { ViajesRoutes } from './routes/viajes.routes';
import { LocalidadesRoutes } from './routes/localidades.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/envios', EnviosRoutes.routes);
    router.use('/api/viajes', ViajesRoutes.routes);
    router.use('/api/localidades', LocalidadesRoutes.routes);

    return router;
  }
}