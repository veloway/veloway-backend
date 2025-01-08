import { type Viaje } from '../../domain/entities/viaje.entity';
import { IConductoresRepository } from '../../domain/repositories/conductor.interface';
import { IViajeRepository } from '../../domain/repositories/viajes.interface';
import { Inject, Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { CustomError } from '../errors/custom.errors';



@Injectable()
export class ViajesService {
  constructor (
    @Inject(REPOSITORIES_TOKENS.IViajesRepository) private readonly viajeRepository: IViajeRepository,
    @Inject(REPOSITORIES_TOKENS.IConductoresRepository) private readonly conductorRepository: IConductoresRepository
  ) {}

  public async getAllByConductoresId(conductorId: string): Promise<Viaje[]> {
    const viajes = await this.viajeRepository.getAllByConductorId(conductorId);
    if (viajes.length === 0) throw CustomError.notFound('No se encontraron viajes');
    return viajes;
  }
}

// modificar la base de datos real