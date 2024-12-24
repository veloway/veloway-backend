import { type Envio } from '../../../domain/entities/envio.entity';
import { type IEnviosRepository } from '../../../domain/repositories/envios.interface';
import { CustomError } from '../../errors/custom.errors';

export class GetAllEnvioUseCase {
  constructor (
    private readonly enviosRepository: IEnviosRepository
  ) {
    this.enviosRepository = enviosRepository;
  }

  async execute(): Promise<Envio[]> {
    try {
      const envios = await this.enviosRepository.getAll();
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
}