import { type Viaje } from '../entities/viaje.entity';

export interface IViajesRepository {
  create: (viaje: Viaje) => Promise<number>
}