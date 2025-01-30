import { PrismaClient } from '@prisma/client';
import { type ICheckpointsRepository } from '../../domain/repositories/checkpoint.interface';
import { Injectable } from '../dependencies/injectable.dependency';
import { type Checkpoint } from '../../domain/entities/checkpoint.entity';
import { CheckpointPrismaMapper } from '../mappers/checkpoint-prisma.mapper';

@Injectable()
export class CheckpointsRepository implements ICheckpointsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(checkpoint: Checkpoint): Promise<number> {
    const checkpointData = await this.prisma.checkpoints.create({
      data: {
        numero: checkpoint.getNumero(),
        id_viaje: checkpoint.getIdViaje(),
        id_checkpoint: checkpoint.getIdCoordenadas()
      }
    });
    return Number(checkpointData.id_checkpoint);
  }

  async getCheckpoint(idCheckpoint: number): Promise<Checkpoint | null> {
    const checkpointsPrisma = await this.prisma.checkpoints.findUnique({
      where: {
        id_checkpoint: idCheckpoint
      },
      include: {
        coordenadas: true
      }
    });

    if (!checkpointsPrisma) {
      return null;
    }

    return CheckpointPrismaMapper.fromPrismaToEntity(checkpointsPrisma);
  }

  async deleteCheckpointByViajeId(idViaje: number): Promise<string> {
    const deleteCheckpoint = await this.prisma.checkpoints.deleteMany({
      where: {
        id_viaje: idViaje
      }
    });

    // Verificar si no se eliminó ningún checkpoint
    if (deleteCheckpoint.count === 0) {
      return `No se encontraron checkpoints asociados al viaje: ${idViaje}`;
    }

    return `Se eliminaron ${deleteCheckpoint.count} checkpoints asociados al viaje con ID: ${idViaje}`;
  }
}