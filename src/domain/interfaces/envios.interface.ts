import { type Envio } from '../entities/envio.entity';

export interface EnviosI {
  getAll: () => Promise<Envio[]>
}