import { type PrismaClient } from '@prisma/client';
import { Localidad } from '../../domain/entities/localidad.entity';
import { Provincia } from '../../domain/entities/provincia.entity';
import { type PostLocalidadDto } from '../../application/dtos/localidad/postLocalidad.dto';
import { type ILocalidadRepository } from '../../domain/repositories/localidad.interface';

export class LocalidadesRepository implements ILocalidadRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getAll: () => Promise<Localidad[]>;
  getAllByProvincia: (provinciaID: number) => Promise<Localidad[]>;
  create: (localidad: PostLocalidadDto) => Promise<void>;
  update: (id: string, localidad: PostLocalidadDto) => Promise<void>;
  delete: (id: string) => Promise<void>;

  public async getLocalidad(localidadID: number): Promise<Localidad | null> {
    const localidadData = await this.prisma.localidades.findFirst({
      where: {
        id_localidad: localidadID
      },
      include: {
        provincias: true
      }
    });

    if (!localidadData) {
      return null;
    }

    const localidadEntity = new Localidad(
      localidadData.id_localidad,
      localidadData.codigo_postal,
      localidadData.nombre,
      new Provincia(
        localidadData.provincias.id_provincia,
        localidadData.provincias.nombre
      )
    );

    return localidadEntity;
  }
}