import { type PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { type Envio } from '../entities/envio.entity';

export interface EnviosI {
  getAll: () => Promise<Envio[]>
  create: (envio: PostEnvioDto) => Promise<void>
}