import 'reflect-metadata';
import { container } from 'tsyringe';
import { prismaClient } from '../data/prismaClient';
import { EnviosRepository } from '../repositories/envios.repository';
import { DomiciliosRepository } from '../repositories/domicilios.repository';
import { LocalidadesRepository } from '../repositories/localidades.repository';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { UsuarioService } from "../../application/services/usuario.service"
import { UsuarioController } from '../../presentation/controllers/usuario.controller';
import { EnviosService } from '../../application/services/envios.service';
import { EnviosController } from '../../presentation/controllers/envios.controller';
import { PrismaClient } from '@prisma/client';
import { REPOSITORIES_TOKENS } from './repositories-tokens.dependency';
import { ViajesRepository } from '../repositories/viajes.repository';
import { ViajesService } from '../../application/services/viajes.service';
import { ViajesController } from '../../presentation/controllers/viajes.controller';
import { CoordenadasRepository } from '../repositories/coordenadas.repository';
import { LocalidadesService } from '../../application/services/localidades.service';
import { LocalidadesController } from '../../presentation/controllers/localidades.controller';


container.register(PrismaClient, { useValue: prismaClient });
// Repositorios
container.register(REPOSITORIES_TOKENS.IEnviosRepository, { useClass: EnviosRepository });
container.register(REPOSITORIES_TOKENS.IDomiciliosRepository, { useClass: DomiciliosRepository });
container.register(REPOSITORIES_TOKENS.ILocalidadesRepository, { useClass: LocalidadesRepository });
container.register(REPOSITORIES_TOKENS.IUsuariosRepository, { useClass: UsuarioRepository });
container.register(REPOSITORIES_TOKENS.IViajesRepository, { useClass: ViajesRepository });
container.register(REPOSITORIES_TOKENS.ICoordenadasRepository, { useClass: CoordenadasRepository });

// Servicios
container.register(EnviosService, { useClass: EnviosService });
container.register(ViajesService, { useClass: ViajesService });
container.register(LocalidadesService, { useClass: LocalidadesService });
container.register(UsuarioService, { useClass: UsuarioService })


// Controladores
container.register(EnviosController, { useClass: EnviosController });
export const enviosController = container.resolve(EnviosController);

container.register(ViajesController, { useClass: ViajesController });
export const viajesController = container.resolve(ViajesController);

container.register(LocalidadesController, { useClass: LocalidadesController });
export const localidadesController = container.resolve(LocalidadesController);

container.register(UsuarioController, { useClass: UsuarioController});
export const usuariosController = container.resolve(UsuarioController)

