import { type Conductor } from '../entities/conductor.entity';

export interface IConductoresRepository {
  create: (conductor: Conductor) => Promise<void>
  buscarConductor: () => Promise<string | null>
  getConductor: (idConductor: string) => Promise<Conductor | null>
}