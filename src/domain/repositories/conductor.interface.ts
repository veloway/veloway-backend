import { type Conductor } from '../entities/conductor.entity';

export interface IConductoresRepository {
  create: (conductor: Conductor) => Promise<number>
}