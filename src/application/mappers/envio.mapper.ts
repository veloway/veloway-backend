import { type PostDomicilioDto } from '../../application/dtos/domicilio/postDomicilio.dto';
import { type PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { Domicilio } from '../../domain/entities/domicilio.entity';
import { Envio } from '../../domain/entities/envio.entity';
import { EstadoEnvio } from '../../domain/entities/estadoEnvio.entity';
import { Localidad } from '../../domain/entities/localidad.entity';
import { Provincia } from '../../domain/entities/provincia.entity';
import { type Usuario } from '../../domain/entities/usuario.entity';
import { type ILocalidadRepository } from '../../domain/repositories/localidad.interface';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';
import { CustomError } from '../errors/custom.errors';

export class EnvioMapper {
  constructor(
    private readonly clienteRepository: IUsuarioRepository,
    private readonly localidadRepository: ILocalidadRepository
  ) {}

  // TODO: Hacer uno para post y otro para put

  public async fromDtoToEntity(envioDto: PostEnvioDto): Promise<Envio> {
    const cliente = await this.mapToCliente(envioDto.clienteID);
    const origen = await this.mapToDomicilio(envioDto.origen);
    const destino = await this.mapToDomicilio(envioDto.destino);
    const estado = new EstadoEnvio(envioDto.estadoID, '');
    return new Envio(
      envioDto.nroSeguimiento, // TODO: Funciona para el post pero no para el put ya que no valida que venga el nroSeguimiento ni el estado
      envioDto.descripcion,
      envioDto.fecha,
      envioDto.hora,
      envioDto.pesoGramos,
      envioDto.monto,
      estado,
      origen,
      destino,
      cliente
    );
  }

  private async mapToCliente(clienteId: string): Promise<Usuario> {
    const cliente = await this.clienteRepository.getUsuario(clienteId);
    if (!cliente) throw CustomError.notFound('El cliente no existe');
    return cliente;
  }

  private async mapToDomicilio(domicilioDto: PostDomicilioDto): Promise<Domicilio> {
    const localidad = await this.localidadRepository.getLocalidad(domicilioDto.localidadID);
    if (!localidad) throw CustomError.notFound('La localidad no existe');

    return new Domicilio(
      domicilioDto.id || 0,
      domicilioDto.calle,
      domicilioDto.numero,
      new Localidad(
        localidad.getID(),
        localidad.getCodigoPostal(),
        localidad.getNombre(),
        new Provincia(
          localidad.getProvincia().getID(),
          localidad.getProvincia().getNombre()
        )
      ),
      domicilioDto.piso,
      domicilioDto.depto,
      domicilioDto.descripcion
    );
  }
}