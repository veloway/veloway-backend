import { type Checkpoint } from '../entities/checkpoint.entity';

export interface ICheckpointsRepository {
  getCheckpoint: () => Promise<Checkpoint>
  postCheckpoint: () => Promise<Checkpoint>
}