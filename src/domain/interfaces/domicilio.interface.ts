import { type PostDomicilioDto } from '../../application/dtos/domicilio/postDomicilio.dto';
import { type Domicilio } from '../entities/domicilio.entity';

export interface DomicilioI {
  getall: () => Promise<Domicilio[]>
  getDomicilio: (
    calle: string,
    numero: number,
    localidadID: number, // Sabiendo la localidad, se puede saber la provincia
    piso: number | null,
    depto: string | null
  ) => Promise<number | null>
  create: (domicilio: PostDomicilioDto) => Promise<number>
  update: (id: number, domicilio: PostDomicilioDto) => Promise<void>
  delete: (id: number) => Promise<void>
}