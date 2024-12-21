import { EnviosRepository } from '../repositories';
import { EnviosService } from '../../application';
import prismaClient from '../data/prisma/prismaClient';
import { EnviosController } from '../../presentation';

const enviosRepository = new EnviosRepository(prismaClient);
const enviosService = new EnviosService(enviosRepository);
const enviosController = new EnviosController(enviosService);

export { enviosController };