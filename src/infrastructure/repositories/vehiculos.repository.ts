import { PrismaClient } from '@prisma/client';
import { Vehiculo } from '../../domain/entities/vehiculo.entity';
import { Injectable } from '../dependencies/injectable.dependency';
import { type IVehiculoRepository } from '../../domain/repositories/vehiculo.interface';
import { EstadoVehiculo } from '../../domain/entities/estadoVehiculo.entity';

@Injectable()
export class VehiculoRepository implements IVehiculoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(): Promise<Vehiculo[]> {
    const vehiculosData = await this.prisma.vehiculo.findMany({
      include: {
        estadoVehiculo: true,
        modelo: true,
        tipoVehiculo: {
          include: {
            modelo: true
          }
        },
        titular: true
      }
    });

    return vehiculosData.map((vehiculoData: any) => this.mapToVehiculo(vehiculoData));
  }


  public async findById(id: number): Promise<Vehiculo | null> {
    const vehiculoData = await this.prisma.vehiculo.findUnique({
      where: { id_vehiculo: id },
      include: {
        estadoVehiculo: true,
        modelo: true,
        tipoVehiculo: {
          include: {
            modelo: true
          }
        },
        titular: true
      }
    });

    return vehiculoData ? this.mapToVehiculo(vehiculoData) : null;
  }


  public async create(vehiculo: Vehiculo): Promise<void> {
    await this.prisma.vehiculo.create({
      data: this.mapFromVehiculo(vehiculo)
    });
  }


  public async update(vehiculo: Vehiculo): Promise<Vehiculo> {
    try {
      const updatedVehiculo = await this.prisma.vehiculo.update({
        where: { id_vehiculo: vehiculo.getIdVehiculo() },
        data: this.mapFromVehiculo(vehiculo)
      });

      return this.mapToVehiculo(updatedVehiculo);
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      throw new Error('No se pudo actualizar el vehículo');
    }
  }


  public async delete(id: number): Promise<void> {
    try {
      await this.prisma.vehiculo.delete({
        where: { id_vehiculo: id }
      });
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
      throw new Error('No se pudo eliminar el vehículo');
    }
  }

  private mapToVehiculo(vehiculoData: any): Vehiculo {
    const estadoVehiculo = new EstadoVehiculo(
      vehiculoData.estadoVehiculo.id,
      vehiculoData.estadoVehiculo.nombre
    );

    return new Vehiculo(
      vehiculoData.id_vehiculo,
      vehiculoData.patente,
      {
        nombre: vehiculoData.modelo.nombre,
        marca: vehiculoData.modelo.marca
      },
      {
        nombre: vehiculoData.tipoVehiculo.nombre,
        modelo: {
          nombre: vehiculoData.tipoVehiculo.modelo.nombre,
          marca: vehiculoData.tipoVehiculo.modelo.marca
        }
      },
      vehiculoData.anio,
      estadoVehiculo,
      {
        nombre: vehiculoData.titular.nombre,
        documento: vehiculoData.titular.documento
      },
      vehiculoData.color,
      vehiculoData.descripcion,
      vehiculoData.nombre_seguro
    );
  }

  private mapFromVehiculo(vehiculo: Vehiculo): any {
    return {
      id_vehiculo: vehiculo.getIdVehiculo(),
      patente: vehiculo.getPatente(),
      modelo_nombre: vehiculo.getModelo(),
      modelo_marca: vehiculo.getMarca(),
      tipo_vehiculo_nombre: vehiculo.getTipoVehiculo().nombre,
      tipo_vehiculo_modelo_nombre: vehiculo.getTipoVehiculo().modelo.nombre,
      tipo_vehiculo_modelo_marca: vehiculo.getTipoVehiculo().modelo.marca,
      anio: vehiculo.getAnio(),
      estado_vehiculo_id: vehiculo.getEstadoVehiculo().getID(),
      estado_nombre: vehiculo.getEstadoVehiculo().getNombre(),
      titular_nombre: vehiculo.getTitular().nombre,
      titular_documento: vehiculo.getTitular().documento,
      color: vehiculo.getColor(),
      descripcion: vehiculo.getDescripcion(),
      nombre_seguro: vehiculo.getNomSeguro()
    };
  }
}
