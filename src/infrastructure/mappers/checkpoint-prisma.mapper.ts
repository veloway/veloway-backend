import { type checkpoints as checkpointsPrisma } from '@prisma/client';
import { Checkpoint } from '../../domain/entities/checkpoint.entity';


// model checkpoints {
//   id_checkpoint Int         @id
//   numero        Int
//   id_viaje      Int
//   coordenadas   coordenadas @relation(fields: [id_checkpoint], references: [id_coordenadas], onDelete: NoAction, onUpdate: NoAction)
//   viajes        viajes      @relation(fields: [id_viaje], references: [id_viaje], onDelete: NoAction, onUpdate: NoAction)
// }

export class CheckpointPrismaMapper {
  public static fromPrismaToEntity(checkpoint: checkpointsPrisma & { coordenadas: { id_coordenadas: number, latitud: number, longitud: number } }): Checkpoint {
    const {
      numero,
      id_viaje,
      id_checkpoint,
      coordenadas: {
        latitud,
        longitud
      }
    } = checkpoint;

    return new Checkpoint(
      numero,
      id_viaje,
      id_checkpoint,
      latitud,
      longitud
    );
  }

  public static fromPrismaArrayToEntity(
    checkpoints: Array<checkpointsPrisma & { coordenadas: { id_coordenadas: number, latitud: number, longitud: number } }>
  ): Checkpoint[] {
    return checkpoints.map((checkpoint) => this.fromPrismaToEntity(checkpoint));
  }
}