import { type PostDomicilioDto } from '../domicilio/postDomicilio.dto';
import { postEnvioValidation } from '../../validations/envio/postEnvio.validation';

export class PostEnvioDto {
  private constructor(
    public descripcion: string,
    public hora: string,
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

    return [undefined, new PostEnvioDto(
      envioValidation.data.descripcion,
      envioValidation.data.hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.reserva,
      envioValidation.data.origen,
      envioValidation.data.destino,
      envioValidation.data.cliente
    )];
  }
}