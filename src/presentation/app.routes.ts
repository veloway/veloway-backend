import { Router } from 'express';
import { EnviosRoutes } from './routes/envios.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/envios', EnviosRoutes.routes);

    return router;
  }
}