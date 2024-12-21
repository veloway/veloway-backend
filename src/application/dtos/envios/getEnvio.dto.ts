import { type Domicilio, type Envio } from '../../../domain';
import { UsuarioDto } from '../usuario';

export class EnvioDto {
  constructor(
    private nroSeguimiento: number,
    private descripcion: string,
    private fecha: Date,
    private hora: Date,
    private pesoGramos: number,
    private monto: number,
    private estado: string,
    private origen: Domicilio,
    private destino: Domicilio,
    private cliente: UsuarioDto
  ) {}

  public static create(envio: Envio): EnvioDto {
    return new EnvioDto(
      envio.getNroSeguimiento(),
      envio.getDescripcion(),
      envio.getFecha(),
      envio.getHora(),
      envio.getPesoGramos(),
      envio.getMonto(),
      envio.getEstado().getNombre(),
      envio.getOrigen(),
      envio.getDestino(),
      UsuarioDto.create(envio.getCliente())
    );
  }
}

