import { type Envio, type Domicilio } from '../../../domain';
import { UsuarioDto } from '../usuario';

export class GetEnvioDto {
  private constructor(
    public nroSeguimiento: number,
    public descripcion: string,
    public fecha: Date,
    public hora: Date,
    public pesoGramos: number,
    public monto: number,
    public estado: string,
    public origen: Domicilio,
    public destino: Domicilio,
    public cliente: UsuarioDto
  ) {}

  public static create(envio: Envio): GetEnvioDto {
    return new GetEnvioDto(
      envio.getNroSeguimiento(),
      envio.getDescripcion(),
      envio.getFecha(),
      envio.getHora(),
      envio.getPesoGramos(),
      envio.getMonto(),
      envio.getEstado(),
      envio.getOrigen(),
      envio.getDestino(),
      UsuarioDto.create(envio.getCliente())
    );
  }
}