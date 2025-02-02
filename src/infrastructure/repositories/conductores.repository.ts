import { PrismaClient } from '@prisma/client';
import { type IConductoresRepository } from '../../domain/repositories/conductor.interface';
import { Injectable } from '../dependencies/injectable.dependency';
import { type Conductor } from '../../domain/entities/conductor.entity';
import { ConductorPrismaMapper } from '../mappers/conductor-prisma.mapper';

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

  public async getConductor(idConductor: string): Promise<Conductor | null> {
    const conductorEncontrado = await this.prisma.conductores.findFirst(
      {
        where: {
          id_conductor: idConductor
        },
        include: {
          estados_conductores: true,
          usuarios: true
        }
      }
    );

    if (!conductorEncontrado) return null;
    return ConductorPrismaMapper.fromPrismaToEntity(conductorEncontrado);
  };

  public async create(conductor: Conductor): Promise<void> {
    await this.prisma.conductores.create({
      data: {
        usuarios: {
          connect: {
            id_usuario: conductor.getID()
          }
        },
        estados_conductores: {
          connect: {
            id_estado: conductor.getEstadoConductor().getIdEstado()
          }
        }
      }
    });
  }
}