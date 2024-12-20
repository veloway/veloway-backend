import { type EnviosI, type Envio } from '../../domain';
// import { type EnviosRepository } from '../../infrastructure';
import { CustomError } from '../errors';

// Implementacion de las reglas de negocio descriptas en las interfaces del dominio.
// Se encarga de manejar la logica de negocio y las validaciones necesarias.

export class EnviosService {
  // TODO:Ver si capaz es mejor hacer una interface para el repositorio, y que esta clase reciba esa interface.
  // Y asi hacer que el servicio tenga que ricibir si o si un objeto que cumpla con la interface del repositorio.
  // Esta interface podria ser la misma que la del repositorio, o podria ser una nueva que tenga solo los metodos que necesita el servicio.
  constructor (private readonly db: EnviosI) {
    this.db = db;
  }

  async getAll(): Promise<Envio[]> {
    try {
      const envios = await this.db.getAll();
      return envios;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
