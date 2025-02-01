import { Router } from 'express';
import { EnviosRoutes } from './routes/envios.routes';
import { LicenciasRoutes } from './routes/licencias.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/envios', EnviosRoutes.routes);
    router.use('/api/licencias', LicenciasRoutes.routes);

    return router;
  }
}