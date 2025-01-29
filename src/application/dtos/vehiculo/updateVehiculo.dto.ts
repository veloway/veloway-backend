import { updateVehiculoValidation } from '../../validations/vehiculo/updateVehiculo.validation';

export class UpdateVehiculoDto {
  constructor(
    public anio?: string,
    public color?: string,
    public descripcion?: string,
    public nomSeguro?: string,
    public patente?: string,
    public tipoVehiculo?: {
      nombre?: string
      modelo?: {
        nombre?: string
        marca?: string
      }
    } | null,
    public titular?: {
      nombre?: string
      documento?: string
    } | null
  ) {}

  public static create(vehiculo: any): [string?, UpdateVehiculoDto?] {
    const vehiculoValidation = updateVehiculoValidation(vehiculo);

    if (!vehiculoValidation.success) {
      return [vehiculoValidation.error.message];
    }


    return [
      undefined,
      new UpdateVehiculoDto(
        vehiculo.anio,
        vehiculo.color,
        vehiculo.descripcion,
        vehiculo.nomSeguro,
        vehiculo.patente,
        vehiculo.tipoVehiculo || null,
        vehiculo.titular || null
      )
    ];
  }
}
