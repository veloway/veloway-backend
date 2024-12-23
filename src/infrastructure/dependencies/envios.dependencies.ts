import { DomiciliosRepository, EnviosRepository, UsuariosRepository } from '../repositories';
import { EnviosService } from '../../application';
import prismaClient from '../data/prisma/prismaClient';
import { EnviosController } from '../../presentation';

const domiciliosRepository = new DomiciliosRepository(prismaClient);
const usuariosRepository = new UsuariosRepository(prismaClient);
const enviosRepository = new EnviosRepository(prismaClient);
const enviosService = new EnviosService(enviosRepository, domiciliosRepository, usuariosRepository);
const enviosController = new EnviosController(enviosService);

export { enviosController };