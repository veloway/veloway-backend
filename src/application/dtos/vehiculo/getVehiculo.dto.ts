import { type Vehiculo } from '../../../domain/entities/vehiculo.entity';

export class GetVehiculoDto {
  private constructor(
    public anio: string,
    public color: string,
    public descripcion: string,
    public nomSeguro: string,
    public patente: string,
    public tipoVehiculo: {
      nombre: string
      modelo: {
        nombre: string
        marca: string
      }
    } | null,
    public titular: {
      nombre: string
      documento: string
    } | null
  ) {}

  public static create(vehiculo: Vehiculo): GetVehiculoDto {
    return new GetVehiculoDto(
      vehiculo.getAnio(),
      vehiculo.getColor(),
      vehiculo.getDescripcion(),
      vehiculo.getNomSeguro(),
      vehiculo.getPatente(),
      vehiculo.getTipoVehiculo()
        ? {
            nombre: vehiculo.getTipoVehiculo().nombre,
            modelo: {
              nombre: vehiculo.getTipoVehiculo().modelo?.nombre || 'Desconocido',
              marca: vehiculo.getTipoVehiculo().modelo?.marca || 'Desconocido'
            }
          }
        : null,
      vehiculo.getTitular()
        ? {
            nombre: vehiculo.getTitular().nombre,
            documento: vehiculo.getTitular().documento
          }
        : null
    );
  }
}
