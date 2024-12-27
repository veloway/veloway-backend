import { type PrismaClient } from '@prisma/client';
import { type Envio } from '../../domain/entities/envio.entity';
import { type IEnviosRepository } from '../../domain/repositories/envios.interface';
import { EnvioPrismaMapper } from '../mappers/envio-prisma.mapper';

export class EnviosRepository implements IEnviosRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getAllByClienteID: (clienteID: string) => Promise<Envio[]>;
  delete: (nroSeguimiento: number) => Promise<Envio>;

  public async getAll(): Promise<Envio[]> {
    const enviosPrisma = await this.prisma.envios.findMany(
      {
        include: {
          usuarios: true,
          estados_envio: true,
          domicilios_envios_id_origenTodomicilios: {
            include: {
              localidades: {
                include: {
                  provincias: true
                }
              }
            }
          },
          domicilios_envios_id_destinoTodomicilios: {
            include: {
              localidades: {
                include: {
                  provincias: true
                }
              }
            }
          }
        }
      }
    );

    return EnvioPrismaMapper.fromPrismaArrayToEntity(enviosPrisma);
  }

  public async create(envio: Envio): Promise<number> {
    const envioData = await this.prisma.envios.create({
      data: {
        nro_seguimiento: envio.getNroSeguimiento(),
        descripcion: envio.getDescripcion(),
        fecha: envio.getFecha(),
        hora: envio.getHora(),
        peso_gramos: envio.getPesoGramos(),
        monto: envio.getMonto(),
        id_cliente: envio.getCliente().getID(),
        id_estado: envio.getEstado().getID(),
        id_origen: envio.getOrigen().getID(),
        id_destino: envio.getDestino().getID()
      }
    });

    return Number(envioData.nro_seguimiento);
  }

  public async buscarEnvioIgual(envio: Envio): Promise<boolean> {
    const envioPrisma = await this.prisma.envios.findFirst({
      where: {
        descripcion: envio.getDescripcion(),
        fecha: envio.getFecha(),
        hora: envio.getHora(),
        peso_gramos: envio.getPesoGramos(),
        id_estado: envio.getEstado().getID(),
        id_cliente: envio.getCliente().getID(),
        id_origen: envio.getOrigen().getID(),
        id_destino: envio.getDestino().getID()
      }
    });

    if (!envioPrisma) {
      return false;
    }

    return true;
  }

  public async update(envio: Envio): Promise<Envio> {
    const envioUpdatePrisma = await this.prisma.envios.update({
      where: {
        nro_seguimiento: envio.getNroSeguimiento()
      },
      data: {
        descripcion: envio.getDescripcion(),
        fecha: envio.getFecha(),
        hora: envio.getHora(),
        peso_gramos: envio.getPesoGramos(),
        monto: envio.getMonto(),
        id_cliente: envio.getCliente().getID(),
        id_estado: envio.getEstado().getID(),
        id_origen: envio.getOrigen().getID(),
        id_destino: envio.getDestino().getID()
      },
      include: {
        usuarios: true,
        estados_envio: true,
        domicilios_envios_id_origenTodomicilios: {
          include: {
            localidades: {
              include: {
                provincias: true
              }
            }
          }
        },
        domicilios_envios_id_destinoTodomicilios: {
          include: {
            localidades: {
              include: {
                provincias: true
              }
            }
          }
        }
      }
    });

    return EnvioPrismaMapper.fromPrismaToEntity(envioUpdatePrisma);
  }

  public async getEnvio(nroSeguimiento: number): Promise<Envio | null> {
    const envioPrisma = await this.prisma.envios.findUnique({
      where: {
        nro_seguimiento: nroSeguimiento
      },
      include: {
        usuarios: true,
        estados_envio: true,
        domicilios_envios_id_origenTodomicilios: {
          include: {
            localidades: {
              include: {
                provincias: true
              }
            }
          }
        },
        domicilios_envios_id_destinoTodomicilios: {
          include: {
            localidades: {
              include: {
                provincias: true
              }
            }
          }
        }
      }
    });

    if (!envioPrisma) {
      return null;
    }

    return EnvioPrismaMapper.fromPrismaToEntity(envioPrisma);
  }
}