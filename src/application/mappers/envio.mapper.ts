import { type PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { Envio } from '../../domain/entities/envio.entity';
import { EstadoEnvio } from '../../domain/entities/estadoEnvio.entity';
import { type Localidad } from '../../domain/entities/localidad.entity';
import { type Usuario } from '../../domain/entities/usuario.entity';
import { type UpdateEnvioDto } from '../dtos/envio/udpateEnvio.dto';
import { DomicilioMapper } from './domicilio.mapper';

interface IFromPostDtoToEntity {
  postEnvioDto: PostEnvioDto
  nroSeguimiento: number
  localidadOrigen: Localidad
  localidadDestino: Localidad
  cliente: Usuario
}

interface IFromUpdateDtoToEntity {
  updateEnvioDto: UpdateEnvioDto
  existingEnvio: Envio
  localidadOrigen: Localidad
  localidadDestino: Localidad
}

export class EnvioMapper {
  public static fromPostDtoToEntity(
    {
      postEnvioDto,
      nroSeguimiento,
      localidadOrigen,
      localidadDestino,
      cliente
    }: IFromPostDtoToEntity): Envio {
    const origen = DomicilioMapper.fromPostDtoToEntity(postEnvioDto.origen, localidadOrigen);
    const destino = DomicilioMapper.fromPostDtoToEntity(postEnvioDto.destino, localidadDestino);

    return new Envio(
      nroSeguimiento,
      postEnvioDto.descripcion,
      postEnvioDto.fecha,
      postEnvioDto.hora,
      postEnvioDto.pesoGramos,
      0,
      new EstadoEnvio(0, ''),
      origen,
      destino,
      cliente
    );
  }

  public static fromUpdateDtoToEntity(
    {
      updateEnvioDto,
      existingEnvio,
      localidadOrigen,
      localidadDestino
    }: IFromUpdateDtoToEntity): Envio {
    existingEnvio.getOrigen().setCalle(updateEnvioDto.origen.calle);
    existingEnvio.getOrigen().setNumero(updateEnvioDto.origen.numero);
    existingEnvio.getOrigen().setPiso(updateEnvioDto.origen.piso);
    existingEnvio.getOrigen().setDepto(updateEnvioDto.origen.depto);
    existingEnvio.getOrigen().setDescripcion(updateEnvioDto.origen.descripcion);
    existingEnvio.getOrigen().setLocalidad(localidadOrigen);

    existingEnvio.getDestino().setCalle(updateEnvioDto.destino.calle);
    existingEnvio.getDestino().setNumero(updateEnvioDto.destino.numero);
    existingEnvio.getDestino().setPiso(updateEnvioDto.destino.piso);
    existingEnvio.getDestino().setDepto(updateEnvioDto.destino.depto);
    existingEnvio.getDestino().setDescripcion(updateEnvioDto.destino.descripcion);
    existingEnvio.getDestino().setLocalidad(localidadDestino);

    return new Envio(
      existingEnvio.getNroSeguimiento(),
      updateEnvioDto.descripcion,
      updateEnvioDto.fecha,
      updateEnvioDto.hora,
      updateEnvioDto.pesoGramos,
      existingEnvio.calcularMonto(),
      existingEnvio.getEstado(),
      existingEnvio.getOrigen(),
      existingEnvio.getDestino(),
      existingEnvio.getCliente()
    );
  }
}