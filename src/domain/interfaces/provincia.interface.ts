import { type PostProvinciaDto } from '../../application/dtos/provincia/postProvincia.dto';
import { type Provincia } from '../entities/provincia.entity';

export class ProvinciaI {
  getAll: () => Promise<Provincia[]>;
  getProvincia: (provinciaID: number) => Promise<Provincia | null>;
  create: (provincia: PostProvinciaDto) => Promise<void>;
  update: (id: string, provincia: PostProvinciaDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
}