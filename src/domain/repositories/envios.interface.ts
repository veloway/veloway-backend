import { type PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { type Envio } from '../entities/envio.entity';

export interface IEnviosRepository {
  getAll: () => Promise<Envio[]>
  getEnvio: (nroSeguimiento: string) => Promise<Envio | null>
  getAllByClienteID: (clienteID: string) => Promise<Envio[]>
  create: (envio: PostEnvioDto) => Promise<number>
  update: (nroSeguimiento: string, envio: PostEnvioDto) => Promise<void>
  delete: (nroSeguimiento: string) => Promise<void>
  buscarEnvioIgual: (envio: PostEnvioDto) => Promise<boolean>
}