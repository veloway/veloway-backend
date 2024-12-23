import { type PrismaClient } from '@prisma/client';
import { type Domicilio, type DomicilioI } from '../../domain';
import { type PostDomicilioDto } from '../../application';
import { normalizeText } from '../../utils';

export class DomiciliosRepository implements DomicilioI {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getall: () => Promise<Domicilio[]>;

  public async getDomicilio(
    calle: string,
    numero: number,
    codigoPostal: number,
    provincia: string,
    piso: number | null,
    depto: string | null
  ): Promise<number | null> {
    const domicilio = await this.prisma.domicilios.findFirst({
      where: {
        calle,
        numero,
        piso,
        depto,
        localidades: {
          provincias: {
            nombre: provincia
          },
          codigo_postal: codigoPostal
        }
      }
    });

    return domicilio ? domicilio.id_domicilio : null;
  };

  public async create(domicilio: PostDomicilioDto): Promise<number> {
    return await this.prisma.$transaction(async (prisma) => {
      // Busca la provincia en la base de datos, si no existe la crea
      let provincia = await prisma.provincias.findFirst({
        where: {
          nombre: normalizeText(domicilio.localidad.provincia.nombre)
        }
      });

      if (!provincia) {
        provincia = await prisma.provincias.create({
          data: {
            nombre: normalizeText(domicilio.localidad.provincia.nombre)
          }
        });
      }
      // Busca la localidad en la base de datos, si no existe la crea
      let localidad = await prisma.localidades.findFirst({
        where: {
          codigo_postal: domicilio.localidad.codigoPostal
        }
      });

      if (!localidad) {
        localidad = await prisma.localidades.create({
          data: {
            codigo_postal: domicilio.localidad.codigoPostal,
            nombre: domicilio.localidad.nombre,
            provincias: {
              connect: { id_provincia: provincia.id_provincia }
            }
          }
        });
      }

      const domicilioPrisma = await prisma.domicilios.create({
        data: {
          calle: domicilio.calle,
          numero: domicilio.numero,
          piso: domicilio.piso,
          depto: domicilio.depto,
          descripcion: domicilio.descripcion,
          localidades: {
            connect: { id_localidad: localidad.id_localidad }
          }
        }
      });

      return domicilioPrisma.id_domicilio;
    });
  }
}


