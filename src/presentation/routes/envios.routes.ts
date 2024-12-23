import { Router } from 'express';
import { enviosController } from '../../infrastructure/dependencies/envios.dependencies';

export class EnviosRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/all', enviosController.getAll);
    router.use('/create', enviosController.create);

    return router;
  }
}