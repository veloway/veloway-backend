import { type PostDomicilioDto } from '../../application/dtos/domicilio/postDomicilio.dto';
import { type Domicilio } from '../entities/domicilio.entity';

export interface DomicilioI {
  getall: () => Promise<Domicilio[]>
  getDomicilio: (domicilio: PostDomicilioDto) => Promise<number | null>
  create: (domicilio: PostDomicilioDto) => Promise<number>
  update: (id: number, domicilio: PostDomicilioDto) => Promise<void>
  delete: (id: number) => Promise<void>
}