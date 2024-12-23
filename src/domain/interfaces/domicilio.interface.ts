import { type PostDomicilioDto } from '../../application/dtos/domicilio/postDomicilio.dto';
import { type Domicilio } from '../entities/domicilio.entity';

export interface DomicilioI {
  getall: () => Promise<Domicilio[]>
  getDomicilio: (
    calle: string,
    numero: number,
    codigoPostal: number,
    provincia: string,
    piso: number | null,
    depto: string | null
  ) => Promise<number | null>
  create: (domicilio: PostDomicilioDto) => Promise<number>
}