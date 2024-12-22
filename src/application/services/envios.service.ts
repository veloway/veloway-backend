import { type EnviosI, type Envio } from '../../domain';
import { type PostEnvioDto } from '../dtos';
import { CustomError } from '../errors';

// Implementacion de las reglas de negocio descriptas en las interfaces del dominio.
// Se encarga de manejar la logica de negocio y las validaciones necesarias.

export class EnviosService {
  constructor (private readonly db: EnviosI) { // la db que se inyecta tiene que cumplir si o si con la interfaz EnviosI
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
      if (error instanceof Error) {
        throw CustomError.internalServerError(error.message);
      }
      throw CustomError.internalServerError();
    }
  }

  async create(envio: PostEnvioDto): Promise<void> {
    try {
      // TODO: Validar que el clienteID exista en la base de datos
      // TODO: Validar que el origen y destino sean distintos
      // TODO: Validar que la localidad de origen y destino existan en la base de datos, si no, crearlas
      await this.db.create(envio);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof Error) {
        throw CustomError.internalServerError(error.message);
      }
      throw CustomError.internalServerError();
    }
  }
}
