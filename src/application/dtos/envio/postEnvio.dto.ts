import { randomInt } from 'crypto';
import { type PostDomicilioDto } from '../domicilio';
import { postEnvioValidation } from '../../validations';

export class PostEnvioDto {
  private constructor(
    public nroSeguimiento: number,
    public descripcion: string,
    public fecha: string,
    public hora: string,
    public pesoGramos: number,
    public monto: number,
    public estado: number,
    public origen: PostDomicilioDto,
    public destino: PostDomicilioDto,
    public clienteID: string
  ) {
    this.nroSeguimiento = randomInt(10000000, 99999999);
    this.estado = 1;
  }

  public static create(envio: any): [string?, PostEnvioDto?] {
    const envioValidation = postEnvioValidation(envio);

    if (!envioValidation.success) {
      return [JSON.parse(envioValidation.error.message)];
    }

    return [undefined, new PostEnvioDto(
      envio.nroSeguimiento,
      envioValidation.data.descripcion,
      envioValidation.data.fecha,
      envioValidation.data.hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.monto,
      envio.estado,
      envioValidation.data.origen,
      envioValidation.data.destino,
      envioValidation.data.cliente
    )];
  }
}