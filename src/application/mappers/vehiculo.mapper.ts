import { type PostVehiculoDto } from '../../application/dtos/vehiculo/postVehiculo.dto';
import { type UpdateVehiculoDto } from '../../application/dtos/vehiculo/updateVehiculo.dto';
import { Vehiculo } from '../../domain/entities/vehiculo.entity';
import { EstadoVehiculoEnum } from '../../domain/types/estadoVehiculo.enum';
import { EstadoVehiculo } from '../../domain/entities/estadoVehiculo.entity';

interface IFromPostDtoToEntity {
  postVehiculoDto: PostVehiculoDto
  modelo: { nombre: string, marca: string }
  tipoVehiculo: { nombre: string, modelo: { nombre: string, marca: string } }
  conductor: { nombre: string, documento: string }
}

interface IFromUpdateDtoToEntity {
  updateVehiculoDto: UpdateVehiculoDto
  existingVehiculo: Vehiculo
  modelo: { nombre: string, marca: string }
  tipoVehiculo: { nombre: string, modelo: { nombre: string, marca: string } }
  conductor: { nombre: string, documento: string }
}

export class VehiculoMapper {
  public static fromPostDtoToEntity(
    {
      postVehiculoDto,
      modelo,
      tipoVehiculo,
      conductor
    }: IFromPostDtoToEntity
  ): Vehiculo {
    const estadoVehiculo = new EstadoVehiculo(EstadoVehiculoEnum.Habilitado, '');

    return new Vehiculo(
      0,
      postVehiculoDto.patente,
      modelo,
      tipoVehiculo,
      postVehiculoDto.anio,
      estadoVehiculo,
      conductor,
      postVehiculoDto.color,
      postVehiculoDto.descripcion,
      postVehiculoDto.nomSeguro
    );
  }

  public static fromUpdateDtoToEntity(
    {
      updateVehiculoDto,
      existingVehiculo,
      modelo,
      tipoVehiculo,
      conductor
    }: IFromUpdateDtoToEntity
  ): Vehiculo {
    if (updateVehiculoDto.patente) {
      existingVehiculo.setPatente(updateVehiculoDto.patente);
    }
    if (updateVehiculoDto.anio) {
      existingVehiculo.setAnio(updateVehiculoDto.anio);
    }
    if (updateVehiculoDto.color) {
      existingVehiculo.setColor(updateVehiculoDto.color);
    }
    if (updateVehiculoDto.descripcion) {
      existingVehiculo.setDescripcion(updateVehiculoDto.descripcion);
    }
    if (updateVehiculoDto.nomSeguro) {
      existingVehiculo.setNomSeguro(updateVehiculoDto.nomSeguro);
    }
    if (updateVehiculoDto.tipoVehiculo?.nombre) {
      // Actualizamos el tipo de vehículo si es necesario
      existingVehiculo.setTipoVehiculo(tipoVehiculo);
    }
    if (updateVehiculoDto.modelo?.nombre) {
      existingVehiculo.setModelo(modelo);
    }
    if (updateVehiculoDto.titular?.nombre) {
      existingVehiculo.setTitular(conductor);
    }

    return existingVehiculo;
  }
}
