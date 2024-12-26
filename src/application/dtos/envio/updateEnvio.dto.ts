export class UpdateEnvioDto {
  private constructor (
    public nroSeguimiento: number,
    public descripcion?: string,
    public fecha?: string,
    public hora?: string,
    public pesoGramos?: number,
    public monto?: number,
    public estadoID?: number,
    public origen?: {
      calle?: string
      numero?: number
      localidadID?: number
      piso?: number
      depto?: string
      descripcion?: string
    },
    public destino?: {
      calle: string
      numero: number
      localidadID: number
      piso: number
      depto: string
      descripcion: string
    }
  ) {}

  public static create(envio: any): [string?, UpdateEnvioDto?] {
    // TODO: Validar que los campos sean correctos con zod

    return [undefined, new UpdateEnvioDto(
      envio.nroSeguimiento,
      envio.descripcion,
      envio.fecha,
      envio.hora,
      envio.pesoGramos,
      envio.monto,
      envio.estadoID,
      envio.origen,
      envio.destino
    )];
  }
}