import { type UpdateEnvioDto } from '../../application/dtos/envio/updateEnvio.dto';
import { type Envio } from '../entities/envio.entity';

export interface IEnviosRepository {
  getAll: () => Promise<Envio[]>
  getEnvio: (nroSeguimiento: number) => Promise<Envio | null>
  getAllByClienteID: (clienteID: string) => Promise<Envio[]>
  create: (envio: Envio) => Promise<number>
  update: (nroSeguimiento: number, envio: UpdateEnvioDto) => Promise<Envio>
  delete: (nroSeguimiento: number) => Promise<Envio>
  buscarEnvioIgual: (envio: Envio) => Promise<boolean>
}