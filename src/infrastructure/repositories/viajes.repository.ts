import { PrismaClient } from '@prisma/client';
import { type IViajeRepository } from '../../domain/repositories/viajes.interface';
import { Injectable } from '../dependencies/injectable.dependency';
import { type Viaje } from '../../domain/entities/viaje.entity';
import { ViajePrismaMapper } from '../mappers/viaje-prisma.mapper';

@Injectable()
export class ViajesRepository implements IViajeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(viaje: Viaje): Promise<number> {
    const viajeData = await this.prisma.viajes.create({
      data: {
        checkpoint_actual: viaje.getCheckpointActual(),
        fecha_inicio: viaje.getFechaInicio(),
        fecha_fin: viaje.getFechaFin(),
        id_conductor: viaje.getIdConductor(),
        nro_seguimiento: viaje.getEnvio().getNroSeguimiento(),
        origen_cord: viaje.getOrigenCord().getIdCoordenadas(),
        destino_cord: viaje.getDestinoCord().getIdCoordenadas()
      }
    });
    return Number(viajeData.id_viaje);
  }

  async getAllByConductorId(conductorId: string): Promise<Viaje[]> {
    const viajesPrisma = await this.prisma.viajes.findMany(
      {
        where: {
          id_conductor: conductorId
        },
        include: {
          conductores: {
            include: {
              estados_conductores: true,
              usuarios: true
            }
          },
          envios: {
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
          },
          coordenadas_viajes_origen_cordTocoordenadas: true,
          coordenadas_viajes_destino_cordTocoordenadas: true
        }
      }
    );
    return ViajePrismaMapper.fromPrismaArrayToEntity(viajesPrisma);
  }

  async getViaje(viajeId: number): Promise<Viaje | null> {
    throw new Error('Method not implemented.');
  }

  async updateCheckpointActual(idViaje: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
