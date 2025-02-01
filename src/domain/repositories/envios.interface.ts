import { type Envio } from '../entities/envio.entity';
import { type PaginationOptions } from '../types/paginationOptions';

export interface IEnviosRepository {
  getAll: () => Promise<Envio[]>
  getEnvio: (nroSeguimiento: number) => Promise<Envio | null>
  getAllByClienteID: (clienteID: string, paginationOptions: PaginationOptions) => Promise<Envio[]>
  totalEnviosByClienteID: (clienteID: string) => Promise<number>
  create: (envio: Envio) => Promise<number>
  update: (envio: Envio) => Promise<Envio>
  buscarEnvioIgual: (envio: Envio) => Promise<boolean>
  updateEstadoEnvio: (numeroSeguimiento: number, estadoEnvioID: number) => Promise<void>
  cancelarEnvio: (nroSeguimiento: number) => Promise<void>
}