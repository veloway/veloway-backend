import { type Coordenadas } from '../entities/coordenadas.entity';

export interface ICoordenadasasRepository {
  getAll: () => Promise<Coordenadas[]>
  getCoordendas: (idCoordenadas: number) => Promise<Coordenadas | null>
}