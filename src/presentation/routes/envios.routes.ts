import { Router } from 'express';
import { EnviosRepository } from '../../infrastructure';
import { EnviosService } from '../../application';
import { EnviosController } from '../controllers/envios.controller';
import { PrismaClient } from '@prisma/client';

export class EnviosRoutes {
  static get routes(): Router {
    const router = Router();
    const prismaClient = new PrismaClient();
    const enviosRepository = new EnviosRepository(prismaClient);
    const enviosService = new EnviosService(enviosRepository);
    const enviosController = new EnviosController(enviosService);

    router.use('/all', enviosController.getAll);

    return router;
  }
}