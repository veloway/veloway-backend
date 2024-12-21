import { envs } from './config';
import { AppRoutes } from './presentation/app.routes';
import { type Options, Server } from './presentation/server';

async function main(): Promise<void> {
  const OPTIONS: Options = {
    port: Number(envs.PORT),
    routes: AppRoutes.routes
  };

  new Server(OPTIONS).start();
}

main().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
});

