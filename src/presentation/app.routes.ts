import { Router } from 'express';
import { EnviosRoutes } from './routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/envios', EnviosRoutes.routes);

    return router;
  }
}