import { Router } from 'express';
import { EnviosRoutes } from './routes/envios.routes';
import { LicenciasRoutes } from './routes/licencias.routes';
import { ViajesRoutes } from './routes/viajes.routes';
import { LocalidadesRoutes } from './routes/localidades.routes';
import { UsuarioRoutes } from './routes/usuario.routes';
import { AuthRoutes } from './routes/auth.routes';
import { CheckpointsRoutes } from './routes/checkpoints.routes';
import { ConductoresRoutes } from './routes/conductores.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/envios', EnviosRoutes.routes);
    router.use('/api/viajes', ViajesRoutes.routes);
    router.use('/api/localidades', LocalidadesRoutes.routes);
    router.use('/api/usuarios', UsuarioRoutes.routes);
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/checkpoints', CheckpointsRoutes.routes);
    router.use('/api/conductores', ConductoresRoutes.routes);
    router.use('/api/licencias', LicenciasRoutes.routes);

    return router;
  }
}