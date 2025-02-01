import { type Checkpoint } from '../entities/checkpoint.entity';

export interface ICheckpointsRepository {
  create: (checkpoint: Checkpoint) => Promise<number>
  getCheckpoint: (idCheckpoint: number) => Promise<Checkpoint | null>
  deleteCheckpointByViajeId: (idViaje: number) => Promise<string>
}