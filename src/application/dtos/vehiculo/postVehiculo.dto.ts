import { postVehiculoValidation } from '../../validations/vehiculo/postVehiculo.validation';

export class PostVehiculoDto {
  constructor(
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

  public static create(vehiculo: any): [string?, PostVehiculoDto?] {
    const vehiculoValidation = postVehiculoValidation(vehiculo);

    if (!vehiculoValidation.success) {
      return [vehiculoValidation.error.message];
    }

    return [
      undefined,
      new PostVehiculoDto(
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
