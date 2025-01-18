import { type Viaje } from '../entities/viaje.entity';

export interface IViajeRepository {
  create(viaje: Viaje): Promise<number>
  updateCheckpointActual(idViaje: number): Promise<number>
  getViaje(viajeId: number): Promise<Viaje | null>
  getAllByConductorId(conductorId: string): Promise<Viaje[]>
  getViajeByNroSeguimiento(nroSeguimiento: number): Promise<Viaje | null>
}