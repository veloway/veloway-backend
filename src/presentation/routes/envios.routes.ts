import { Router } from 'express';
import { enviosController } from '../../infrastructure/dependencies/container.dependency';

export class EnviosRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', enviosController.getAll);
    router.get('/cliente/:clienteID', enviosController.getAllByClienteId);
    router.get('/nro-seguimiento/:nroSeguimiento', enviosController.getEnvio);
    router.post('/create', enviosController.create);
    router.put('/update/:nroSeguimiento', enviosController.update);
    router.patch('/update-estado/:nroSeguimiento', enviosController.updateEstadoEnvio);

    return router;
  }
}