import { type PrismaClient } from '@prisma/client';
import { type Domicilio } from '../../domain/entities/domicilio.entity';
import { type PostDomicilioDto } from '../../application/dtos/domicilio/postDomicilio.dto';
import { type IDomicilioRepository } from '../../domain/repositories/domicilio.interface';

export class DomiciliosRepository implements IDomicilioRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getall: () => Promise<Domicilio[]>;
  update: (id: number, domicilio: PostDomicilioDto) => Promise<void>;
  delete: (id: number) => Promise<void>;

  public async getDomicilio(domicilio: PostDomicilioDto): Promise<number | null> {
    const domicilioData = await this.prisma.domicilios.findFirst({
      where: {
        calle: domicilio.calle,
        numero: domicilio.numero,
        piso: domicilio.piso,
        depto: domicilio.depto,
        localidades: {
          id_localidad: domicilio.localidadID // Al saber la localidad, se sabe la provincia
        }
      }
    });

    return domicilioData ? domicilioData.id_domicilio : null;
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


