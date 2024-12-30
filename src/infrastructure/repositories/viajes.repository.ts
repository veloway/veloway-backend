/* import { type PrismaClient } from '@prisma/client';
import { type Viaje } from '../../domain/entities/viaje.entity';
import { type IViajeRepository } from '../../domain/repositories/viajes.interface';
import { ViajePrismaMapper } from '../mappers/viaje-prisma.mapper';

export class viajesRepository implements IViajeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(viaje: Viaje): Promise<number> {
    const viajeData = await this.prisma.viajes.create({
      data: {
        id_viaje: viaje.getIdViaje(),
        checkpointActual: viaje.getCheckpointActual(),
        fechaInicio: viaje.getFechaInicio(),
        // id_conductor: viaje.getConductor(),
        nro_seguimiento: viaje.getNroSeguimiento()
      }
    });

    return Number(viajeData.id_viaje);
  }
} */