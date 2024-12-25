import { EnviosService } from '../../application/services/envios.service';
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
// Crear servicio
const enviosService = new EnviosService(
  enviosRepository,
  domiciliosRepository,
  usuariosRepository,
  localidadesRepository
);
// Crear instancia del controlador
const enviosController = new EnviosController(enviosService);

export { enviosController };