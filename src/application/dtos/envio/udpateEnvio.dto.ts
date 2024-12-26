import { type PostDomicilioDto } from '../domicilio/postDomicilio.dto';
import { updateEnvioValidation } from '../../validations/envio/udpateEnvio.validation';

export class UpdateEnvioDto {
  private constructor(
    public nroSeguimiento: number,
    public descripcion: string,
    public fecha: Date,
    public hora: Date,
    public pesoGramos: number,
    public monto: number,
    public estadoID: number,
    public origen: PostDomicilioDto,
    public destino: PostDomicilioDto,
    public clienteID: string
  ) {}

  public static create(envio: any): [string?, UpdateEnvioDto?] {
    const envioValidation = updateEnvioValidation(envio);

    if (!envioValidation.success) {
      return [JSON.parse(envioValidation.error.message)];
    }

    // Convierte la fecha y hora en formato Date para poder guardarla en la base de datos
    const fecha = new Date(envioValidation.data.fecha);
    const hora = new Date(`1970-01-01T${envioValidation.data.hora}Z`); // La z es para que tome la hora en UTC

    return [undefined, new UpdateEnvioDto(
      envioValidation.data.nroSeguimiento,
      envioValidation.data.descripcion,
      fecha,
      hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.monto,
      envioValidation.data.estadoID,
      envioValidation.data.origen,
      envioValidation.data.destino,
      envioValidation.data.clienteID
    )];
  }
}