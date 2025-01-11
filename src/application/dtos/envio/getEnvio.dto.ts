import { type Domicilio } from '../../../domain/entities/domicilio.entity';
import { type Envio } from '../../../domain/entities/envio.entity';
import { UsuarioDto } from '../usuario/getUsuario.dto';

export class GetEnvioDto {
  private constructor(
    public nroSeguimiento: number,
    public descripcion: string,
    public fecha: string,
    public hora: string,
    public pesoGramos: number,
    public monto: number,
    public reserva: boolean,
    public estado: string,
    public origen: Domicilio,
    public destino: Domicilio,
    public cliente: UsuarioDto
  ) {}

  public static create(envio: Envio): GetEnvioDto {
    const fecha = envio.getFecha().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const hora = envio.getHora().toISOString().split('T')[1].slice(0, 5); // 'HH:mm'

    return new GetEnvioDto(
      envio.getNroSeguimiento(),
      envio.getDescripcion(),
      fecha,
      hora,
      envio.getPesoGramos(),
      envio.getMonto(),
      envio.getReserva(),
      envio.getEstado().getNombre(),
      envio.getOrigen(),
      envio.getDestino(),
      UsuarioDto.create(envio.getCliente())
    );
  }
}