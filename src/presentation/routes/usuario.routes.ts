import { Router } from 'express';
import { usuariosController } from '../../infrastructure/dependencies/container.dependency';

export class UsuarioRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', usuariosController.getAll);
    router.get('/id/:id', usuariosController.getUsuarioPorId);
    router.get('/email/:email', usuariosController.getUsuarioPorEmail);
    router.post('/register', usuariosController.register);
    // router.post('/login', usuariosController.login);
    // router.post('/logout', usuariosController.logout);
    // router.post('/password-reset/request', usuariosController.requestPasswordReset);
    // router.post('/password-reset/reset', usuariosController.resetPassword);

    return router;
  }
};