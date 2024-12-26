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
import { type UpdateEnvioDto } from '../dtos/envio/udpateEnvio.dto';
import { CustomError } from '../errors/custom.errors';

export class EnvioMapper {
  constructor(
    private readonly clienteRepository: IUsuarioRepository,
    private readonly localidadRepository: ILocalidadRepository
  ) {}

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

  public async fromPostDtoToEntity(
    envioDto: PostEnvioDto,
    newNroSeguimiento: number,
    estadoEnvioID: number
  ): Promise<Envio> {
    const cliente = await this.mapToCliente(envioDto.clienteID);
    const origen = await this.mapToDomicilio(envioDto.origen);
    const destino = await this.mapToDomicilio(envioDto.destino);
    return new Envio(
      newNroSeguimiento,
      envioDto.descripcion,
      envioDto.fecha,
      envioDto.hora,
      envioDto.pesoGramos,
      envioDto.monto,
      new EstadoEnvio(estadoEnvioID, ''),
      origen,
      destino,
      cliente
    );
  }

  public async fromUpdateDtoToEntity(envioDto: UpdateEnvioDto) {
    const cliente = await this.mapToCliente(envioDto.clienteID);
    const origen = await this.mapToDomicilio(envioDto.origen);
    const destino = await this.mapToDomicilio(envioDto.destino);
    return new Envio(
      envioDto.nroSeguimiento,
      envioDto.descripcion,
      envioDto.fecha,
      envioDto.hora,
      envioDto.pesoGramos,
      envioDto.monto,
      new EstadoEnvio(envioDto.estadoID, ''),
      origen,
      destino,
      cliente
    );
  }
}