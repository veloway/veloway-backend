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
import { type UpdateDomicilioDto } from '../dtos/domicilio/updateDomicilio.dto';
import { type UpdateEnvioDto } from '../dtos/envio/udpateEnvio.dto';
import { CustomError } from '../errors/custom.errors';

export class EnvioMapper {
  constructor(
    private readonly clienteRepository: IUsuarioRepository,
    private readonly localidadRepository: ILocalidadRepository
  ) {}

  public async fromPostDtoToEntity(
    postEnvioDto: PostEnvioDto,
    newNroSeguimiento: number,
    estadoEnvioID: number
  ): Promise<Envio> {
    const [cliente, origen, destino] = await this.getClienteDomicilios(
      postEnvioDto.clienteID,
      postEnvioDto.origen,
      postEnvioDto.destino
    );
    return new Envio(
      newNroSeguimiento,
      postEnvioDto.descripcion,
      postEnvioDto.fecha,
      postEnvioDto.hora,
      postEnvioDto.pesoGramos,
      0,
      new EstadoEnvio(estadoEnvioID, ''),
      origen,
      destino,
      cliente
    );
  }

  public async fromUpdateDtoToEntity(
    nroSeguimiento: number,
    updateEnvioDto: UpdateEnvioDto,
    existingEnvio: Envio
  ): Promise<Envio> {
    const origen = updateEnvioDto.origen
      ? await this.mapToUpdateDomicilio(existingEnvio.getOrigen(), updateEnvioDto.origen)
      : existingEnvio.getOrigen();

    const destino = updateEnvioDto.destino
      ? await this.mapToUpdateDomicilio(existingEnvio.getDestino(), updateEnvioDto.destino)
      : existingEnvio.getDestino();

    return new Envio(
      nroSeguimiento,
      updateEnvioDto.descripcion ?? existingEnvio.getDescripcion(),
      updateEnvioDto.fecha ?? existingEnvio.getFecha(),
      updateEnvioDto.hora ?? existingEnvio.getHora(),
      updateEnvioDto.pesoGramos ?? existingEnvio.getPesoGramos(),
      updateEnvioDto.monto ?? existingEnvio.getMonto(),
      new EstadoEnvio(updateEnvioDto.estadoID ?? existingEnvio.getEstado().getID(), ''),
      origen,
      destino,
      existingEnvio.getCliente()
    );
  }

  private async getClienteDomicilios(
    clienteID: string,
    origen: PostDomicilioDto,
    destino: PostDomicilioDto
  ): Promise<[Usuario, Domicilio, Domicilio]> {
    const cliente = await this.mapToCliente(clienteID);
    const origenDomicilio = await this.mapToDomicilio(origen);
    const destinoDomicilio = await this.mapToDomicilio(destino);
    return [cliente, origenDomicilio, destinoDomicilio];
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
      0,
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

  private async mapToUpdateDomicilio(
    existingDomicilio: Domicilio,
    updateDomicilio: UpdateDomicilioDto
  ): Promise<Domicilio> {
    existingDomicilio.setCalle(updateDomicilio.calle ?? existingDomicilio.getCalle());
    existingDomicilio.setNumero(updateDomicilio.numero ?? existingDomicilio.getNumero());
    existingDomicilio.setPiso(updateDomicilio.piso ?? existingDomicilio.getPiso() ?? null);
    existingDomicilio.setDepto(updateDomicilio.depto ?? existingDomicilio.getDepto() ?? null);
    existingDomicilio.setDescripcion(updateDomicilio.descripcion ?? existingDomicilio.getDescripcion() ?? null);
    if (updateDomicilio.localidadID) {
      const localidad = await this.localidadRepository.getLocalidad(updateDomicilio.localidadID);
      if (!localidad) throw CustomError.notFound('La localidad no existe');
      existingDomicilio.setLocalidad(
        new Localidad(
          localidad.getID(),
          localidad.getCodigoPostal(),
          localidad.getNombre(),
          new Provincia(
            localidad.getProvincia().getID(),
            localidad.getProvincia().getNombre()
          )
        )
      );
    }
    return existingDomicilio;
  }
}