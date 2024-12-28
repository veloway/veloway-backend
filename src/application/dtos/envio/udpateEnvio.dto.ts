import { updateEnvioValidation } from '../../validations/envio/udpateEnvio.validation';
import { type UpdateDomicilioDto } from '../domicilio/updateDomicilio.dto';

export class UpdateEnvioDto {
  private constructor(
    public descripcion?: string,
    public fecha?: Date,
    public hora?: Date,
    public pesoGramos?: number,
    public monto?: number,
    public estadoID?: number,
    public origen?: UpdateDomicilioDto,
    public destino?: UpdateDomicilioDto
  ) {}

  public static create(envio: any): [string?, UpdateEnvioDto?] {
    const envioValidation = updateEnvioValidation(envio);

    if (!envioValidation.success) {
      return [JSON.parse(envioValidation.error.message)];
    }

    const fecha = envioValidation.data.fecha ? new Date(envioValidation.data.fecha) : undefined;
    const hora = envioValidation.data.hora ? new Date(`1970-01-01T${envioValidation.data.hora}Z`) : undefined;

    return [undefined, new UpdateEnvioDto(
      envioValidation.data.descripcion,
      fecha,
      hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.monto,
      envioValidation.data.estadoID,
      envioValidation.data.origen,
      envioValidation.data.destino
    )];
  }
}