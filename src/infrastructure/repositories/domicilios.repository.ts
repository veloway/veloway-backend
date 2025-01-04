import { PrismaClient } from '@prisma/client';
import { Domicilio } from '../../domain/entities/domicilio.entity';
import { type IDomicilioRepository } from '../../domain/repositories/domicilio.interface';
import { Injectable } from '../dependencies/injectable.dependency';

@Injectable()
export class DomiciliosRepository implements IDomicilioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getall: () => Promise<Domicilio[]>;
  delete: (id: number) => Promise<Domicilio>;

  public async getDomicilioByProperties(domicilio: Domicilio): Promise<Domicilio | null> {
    const domicilioData = await this.prisma.domicilios.findFirst({
      where: {
        calle: domicilio.getCalle(),
        numero: domicilio.getNumero(),
        piso: domicilio.getPiso(),
        depto: domicilio.getDepto(),
        localidades: {
          id_localidad: domicilio.getLocalidad().getID()// Al saber la localidad, se sabe la provincia
        }
      }
    });

    if (!domicilioData) return null;

    return new Domicilio(
      domicilioData.id_domicilio,
      domicilioData.calle,
      domicilioData.numero,
      domicilio.getLocalidad(),
      domicilioData.piso,
      domicilioData.depto,
      domicilioData.descripcion
    );
  };

  public async create(domicilio: Domicilio): Promise<Domicilio> {
    const domicilioPrisma = await this.prisma.domicilios.create({
      data: {
        calle: domicilio.getCalle(),
        numero: domicilio.getNumero(),
        piso: domicilio.getPiso(),
        depto: domicilio.getDepto(),
        descripcion: domicilio.getDescripcion(),
        localidades: {
          connect: {
            id_localidad: domicilio.getLocalidad().getID()
          }
        }
      }
    });

    return new Domicilio(
      domicilioPrisma.id_domicilio,
      domicilioPrisma.calle,
      domicilioPrisma.numero,
      domicilio.getLocalidad(),
      domicilioPrisma.piso,
      domicilioPrisma.depto,
      domicilioPrisma.descripcion
    );
  }

  public async update(idDomicilio: number, domicilio: Domicilio): Promise<Domicilio> {
    const domicilioPrisma = await this.prisma.domicilios.update({
      where: {
        id_domicilio: idDomicilio
      },
      data: {
        calle: domicilio.getCalle(),
        numero: domicilio.getNumero(),
        piso: domicilio.getPiso(),
        depto: domicilio.getDepto(),
        descripcion: domicilio.getDescripcion(),
        localidades: {
          connect: {
            id_localidad: domicilio.getLocalidad().getID()
          }
        }
      }
    });

    return new Domicilio(
      domicilioPrisma.id_domicilio,
      domicilioPrisma.calle,
      domicilioPrisma.numero,
      domicilio.getLocalidad(),
      domicilioPrisma.piso,
      domicilioPrisma.depto,
      domicilioPrisma.descripcion
    );
  }
}


