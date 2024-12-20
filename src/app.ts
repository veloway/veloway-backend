import { AppRoutes } from './presentation/app.routes';
import { type Options, Server } from './presentation/server';
import 'dotenv/config';

(async () => {
  try {
    await main();
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();



async function main(): Promise<void> {
  const OPTIONS: Options = {
    port: Number(process.env.PORT),
    routes: AppRoutes.routes
  };
  // TODO: await de la base de datos
  new Server(OPTIONS).start();
}


