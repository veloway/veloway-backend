import { type PostLocalidadDto } from '../../application/dtos/localidad/postLocalidad.dto';
import { type Localidad } from '../entities/localidad.entity';

export class ILocalidadRepository {
  getAll: () => Promise<Localidad[]>;
  getAllByProvincia: (provinciaID: number) => Promise<Localidad[]>;
  getLocalidad: (localidadID: number) => Promise<Localidad | null>;
  create: (localidad: PostLocalidadDto) => Promise<void>;
  update: (id: string, localidad: PostLocalidadDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
}