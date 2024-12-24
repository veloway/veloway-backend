import { CreateEnvioUseCase } from '../../application/use-cases/envios/create.usecase';
import { GetAllEnvioUseCase } from '../../application/use-cases/envios/get-all.usecase';
import { EnviosController } from '../../presentation/controllers/envios.controller';
import { prismaClient } from '../data/prismaClient';
import { DomiciliosRepository } from '../repositories/domicilios.repository';
import { EnviosRepository } from '../repositories/envios.repository';
import { LocalidadesRepository } from '../repositories/localidades.repository';
import { UsuariosRepository } from '../repositories/usuarios.repository';

// Crear instancias de los repositorios
const localidadesRepository = new LocalidadesRepository(prismaClient);
const domiciliosRepository = new DomiciliosRepository(prismaClient);
const usuariosRepository = new UsuariosRepository(prismaClient);
const enviosRepository = new EnviosRepository(prismaClient);

// Crear instancias de los casos de uso
const getAllEnvioUseCase = new GetAllEnvioUseCase(enviosRepository);
const createEnvioUseCase = new CreateEnvioUseCase(
  enviosRepository,
  domiciliosRepository,
  usuariosRepository,
  localidadesRepository
);

// Crear instancia del controlador
const enviosController = new EnviosController(
  getAllEnvioUseCase,
  createEnvioUseCase
);

export { enviosController };