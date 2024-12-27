import { Router } from 'express';
import { enviosController } from '../../infrastructure/dependencies/envios.dependencies';

export class EnviosRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/all', enviosController.getAll);
    router.post('/create', enviosController.create);
    router.patch('/update/:nroSeguimiento', enviosController.update);

    return router;
  }
}