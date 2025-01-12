import { updateEnvioValidation } from '../../validations/envio/udpateEnvio.validation';
import { type UpdateDomicilioDto } from '../domicilio/updateDomicilio.dto';

export class UpdateEnvioDto {
  private constructor(
    public descripcion: string,
    public fecha: string,
    public hora: string,
    public pesoGramos: number,
    public origen: UpdateDomicilioDto,
    public destino: UpdateDomicilioDto
  ) {}

  public static create(envio: any): [string?, UpdateEnvioDto?] {
    const envioValidation = updateEnvioValidation(envio);

    if (!envioValidation.success) {
      return [JSON.parse(envioValidation.error.message)];
    }

    return [undefined, new UpdateEnvioDto(
      envioValidation.data.descripcion,
      envioValidation.data.fecha,
      envioValidation.data.hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.origen,
      envioValidation.data.destino
    )];
  }
}