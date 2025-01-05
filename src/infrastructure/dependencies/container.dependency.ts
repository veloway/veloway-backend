import 'reflect-metadata';
import { container } from 'tsyringe';
import { prismaClient } from '../data/prismaClient';
import { EnviosRepository } from '../repositories/envios.repository';
import { DomiciliosRepository } from '../repositories/domicilios.repository';
import { LocalidadesRepository } from '../repositories/localidades.repository';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { EnviosService } from '../../application/services/envios.service';
import { EnviosController } from '../../presentation/controllers/envios.controller';
import { PrismaClient } from '@prisma/client';
import { REPOSITORIES_TOKENS } from './repositories-tokens.dependency';
import { LocalidadesService } from '../../application/services/localidades.service';
import { LocalidadesController } from '../../presentation/controllers/localidades.controller';

container.register(PrismaClient, { useValue: prismaClient });
// Repositorios
container.register(REPOSITORIES_TOKENS.IEnviosRepository, { useClass: EnviosRepository });
container.register(REPOSITORIES_TOKENS.IDomiciliosRepository, { useClass: DomiciliosRepository });
container.register(REPOSITORIES_TOKENS.ILocalidadesRepository, { useClass: LocalidadesRepository });
container.register(REPOSITORIES_TOKENS.IUsuariosRepository, { useClass: UsuariosRepository });

// Servicios
container.register(EnviosService, { useClass: EnviosService });
container.register(LocalidadesService, { useClass: LocalidadesService });

// Controladores
container.register(EnviosController, { useClass: EnviosController });
export const enviosController = container.resolve(EnviosController);
container.register(LocalidadesController, { useClass: LocalidadesController });
export const localidadesController = container.resolve(LocalidadesController);
