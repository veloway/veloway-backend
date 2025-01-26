import { PrismaClient } from '@prisma/client';
import { type IConductoresRepository } from '../../domain/repositories/conductor.interface';
import { Injectable } from '../dependencies/injectable.dependency';
import { type Conductor } from '../../domain/entities/conductor.entity';

@Injectable()
export class ConductoresRepository implements IConductoresRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async buscarConductor(): Promise<string | null> {
    const conductorDisponible = await this.prisma.conductores.findFirst(
      {
        where: {
          id_estado: 1
        }
      }
    );

    return conductorDisponible ? conductorDisponible.id_conductor : null;
  }

  public async create(conductor: Conductor): Promise<void> {
    await this.prisma.conductores.create({
      data: {
        id_conductor: conductor.getID(),
        id_estado: conductor.getEstadoConductor().getIdEstado()
      }
    });
  }
}