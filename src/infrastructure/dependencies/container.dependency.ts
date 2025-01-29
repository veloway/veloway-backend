import 'reflect-metadata';
import { container } from 'tsyringe';
import { prismaClient } from '../data/prismaClient';
import { EnviosRepository } from '../repositories/envios.repository';
import { DomiciliosRepository } from '../repositories/domicilios.repository';
import { LocalidadesRepository } from '../repositories/localidades.repository';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { UsuarioService } from '../../application/services/usuario.service';
import { UsuarioController } from '../../presentation/controllers/usuario.controller';
import { AuthController } from '../../presentation/auth/auth.controller';
import { AuthService } from '../../application/services/auth.service';
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
import { ConductoresRepository } from '../repositories/conductores.repository';
import { VehiculoRepository } from '../repositories/vehiculos.repository';
import { VehiculosService } from '../../application/services/vehiculo.service';
import { VehiculosController } from '../../presentation/controllers/vehiculo.controller';


container.register(PrismaClient, { useValue: prismaClient });
// Repositorios
container.register(REPOSITORIES_TOKENS.IEnviosRepository, { useClass: EnviosRepository });
container.register(REPOSITORIES_TOKENS.IDomiciliosRepository, { useClass: DomiciliosRepository });
container.register(REPOSITORIES_TOKENS.ILocalidadesRepository, { useClass: LocalidadesRepository });
container.register(REPOSITORIES_TOKENS.IUsuariosRepository, { useClass: UsuarioRepository });
container.register(REPOSITORIES_TOKENS.IViajesRepository, { useClass: ViajesRepository });
container.register(REPOSITORIES_TOKENS.ICoordenadasRepository, { useClass: CoordenadasRepository });
container.register(REPOSITORIES_TOKENS.IConductoresRepository, { useClass: ConductoresRepository });
container.register(REPOSITORIES_TOKENS.IVehiculosRepository, { useClass: VehiculoRepository });
// Servicios
container.register(EnviosService, { useClass: EnviosService });
container.register(ViajesService, { useClass: ViajesService });
container.register(LocalidadesService, { useClass: LocalidadesService });
container.register(UsuarioService, { useClass: UsuarioService });
container.register(AuthService, { useClass: AuthService });
container.register(VehiculosService, { useClass: VehiculosService });

// Controladores
container.register(EnviosController, { useClass: EnviosController });
export const enviosController = container.resolve(EnviosController);

container.register(ViajesController, { useClass: ViajesController });
export const viajesController = container.resolve(ViajesController);

container.register(LocalidadesController, { useClass: LocalidadesController });
export const localidadesController = container.resolve(LocalidadesController);

container.register(UsuarioController, { useClass: UsuarioController });
export const usuariosController = container.resolve(UsuarioController);

container.register(AuthController, { useClass: AuthController });
export const authController = container.resolve(AuthController);

container.register(VehiculosController, { useClass: VehiculosController });
export const vehiculosController = container.resolve(VehiculosController);
