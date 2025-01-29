import { type Vehiculo } from '../entities/vehiculo.entity';

export interface IVehiculoRepository {
  update: (vehiculo: Vehiculo) => Promise<Vehiculo>
  create: (vehiculo: Vehiculo) => Promise<void>
  findById: (id: number) => Promise<Vehiculo | null>
  findAll: () => Promise<Vehiculo[]>
  delete: (id: number) => Promise<void>
}
