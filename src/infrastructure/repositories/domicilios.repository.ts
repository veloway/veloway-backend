import { type PrismaClient } from '@prisma/client';
import { type Domicilio } from '../../domain/entities/domicilio.entity';
import { type DomicilioI } from '../../domain/interfaces/domicilio.interface';
import { type PostDomicilioDto } from '../../application/dtos/domicilio/postDomicilio.dto';

export class DomiciliosRepository implements DomicilioI {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getall: () => Promise<Domicilio[]>;
  update: (id: number, domicilio: PostDomicilioDto) => Promise<void>;
  delete: (id: number) => Promise<void>;

  public async getDomicilio(
    calle: string,
    numero: number,
    localidadID: number,
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
          id_localidad: localidadID
        }
      }
    });

    return domicilio ? domicilio.id_domicilio : null;
  };

  public async create(domicilio: PostDomicilioDto): Promise<number> {
    const domicilioPrisma = await this.prisma.domicilios.create({
      data: {
        calle: domicilio.calle,
        numero: domicilio.numero,
        piso: domicilio.piso,
        depto: domicilio.depto,
        descripcion: domicilio.descripcion,
        localidades: {
          connect: {
            id_localidad: domicilio.localidadID
          }
        }
      }
    });

    return domicilioPrisma.id_domicilio;
  }
}


