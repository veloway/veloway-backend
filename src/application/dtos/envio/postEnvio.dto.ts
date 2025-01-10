import { type PostDomicilioDto } from '../domicilio/postDomicilio.dto';
import { postEnvioValidation } from '../../validations/envio/postEnvio.validation';

export class PostEnvioDto {
  private constructor(
    public descripcion: string,
    public fecha: Date,
    public hora: Date,
    public pesoGramos: number,
    public reserva: boolean,
    public origen: PostDomicilioDto,
    public destino: PostDomicilioDto,
    public clienteID: string
  ) {}

  public static create(envio: any): [string?, PostEnvioDto?] {
    const envioValidation = postEnvioValidation(envio);

    if (!envioValidation.success) {
      return [JSON.parse(envioValidation.error.message)];
    }

    // Convierte la fecha y hora en formato Date para poder guardarla en la base de datos
    const fecha = new Date(envioValidation.data.fecha);
    const hora = new Date(`1970-01-01T${envioValidation.data.hora}Z`); // La z es para que tome la hora en UTC

    return [undefined, new PostEnvioDto(
      envioValidation.data.descripcion,
      fecha,
      hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.reserva,
      envioValidation.data.origen,
      envioValidation.data.destino,
      envioValidation.data.cliente
    )];
  }
}