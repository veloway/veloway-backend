import { type Envio } from '../entities/envio.entity';

export interface IEnviosRepository {
  getAll: () => Promise<Envio[]>
  getEnvio: (nroSeguimiento: number) => Promise<Envio | null>
  getAllByClienteID: (clienteID: string) => Promise<Envio[]>
  create: (envio: Envio) => Promise<number>
  update: (envio: Envio) => Promise<Envio>
  delete: (nroSeguimiento: number) => Promise<Envio>
  buscarEnvioIgual: (envio: Envio) => Promise<boolean>
}