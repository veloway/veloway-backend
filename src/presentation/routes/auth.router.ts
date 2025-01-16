import { Router } from 'express';
import { authController } from '../../infrastructure/dependencies/container.dependency';



export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.post('/login', authController.login);
    router.post('/logout', authController.logout);
    router.post('/password-reset/request', authController.requestPasswordReset);
    router.post('/password-reset/reset', authController.resetPassword);

    return router;
  }
};  