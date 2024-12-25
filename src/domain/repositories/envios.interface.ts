import { type Envio } from '../entities/envio.entity';

export interface IEnviosRepository {
  getAll: () => Promise<Envio[]>
  getEnvio: (nroSeguimiento: string) => Promise<Envio | null>
  getAllByClienteID: (clienteID: string) => Promise<Envio[]>
  create: (envio: Envio) => Promise<number>
  update: (nroSeguimiento: string, envio: Envio) => Promise<Envio>
  delete: (nroSeguimiento: string) => Promise<Envio>
  buscarEnvioIgual: (envio: Envio) => Promise<boolean>
}