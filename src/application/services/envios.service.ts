import { randomInt } from 'crypto';
import { PESO_GRAMOS_MAX, type Envio } from '../../domain/entities/envio.entity';
import { type IDomicilioRepository } from '../../domain/repositories/domicilio.interface';
import { type IEnviosRepository } from '../../domain/repositories/envios.interface';
import { type ILocalidadRepository } from '../../domain/repositories/localidad.interface';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';
import { type PostEnvioDto } from '../dtos/envio/postEnvio.dto';
import { type UpdateEnvioDto } from '../dtos/envio/udpateEnvio.dto';
import { CustomError } from '../errors/custom.errors';
import { EnvioMapper } from '../mappers/envio.mapper';
import { EstadoEnvioEnum } from '../../domain/types/estadoEnvio.enum';
import { Inject, Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { type Domicilio } from '../../domain/entities/domicilio.entity';
import { DomicilioMapper } from '../mappers/domicilio.mapper';

@Injectable()
export class EnviosService {
  constructor (
    @Inject(REPOSITORIES_TOKENS.IEnviosRepository) private readonly enviosRepository: IEnviosRepository,
    @Inject(REPOSITORIES_TOKENS.IDomiciliosRepository) private readonly domicilioRepository: IDomicilioRepository,
    @Inject(REPOSITORIES_TOKENS.ILocalidadesRepository) private readonly localidadRepository: ILocalidadRepository,
    @Inject(REPOSITORIES_TOKENS.IUsuariosRepository) private readonly clienteRepository: IUsuarioRepository
  ) {}

  public async getAll(): Promise<Envio[]> {
    const envios = await this.enviosRepository.getAll();
    if (envios.length === 0) throw CustomError.notFound('No se encontraron envíos');
    return envios;
  }

  public async getAllByClienteId(clienteID: string): Promise<Envio[]> { // TODO: Implementar filtros de busqueda para el getAllByClienteID
    const envios = await this.enviosRepository.getAllByClienteID(clienteID);
    if (envios.length === 0) throw CustomError.badRequest(`No se encontraron envíos para el cliente con id: ${clienteID}`);
    return envios;
  }

  public async getEnvio(nroSeguimiento: number): Promise<Envio> {
    const envio = await this.enviosRepository.getEnvio(nroSeguimiento);

    if (!envio) throw CustomError.notFound(`No se encontró un envío con el número: ${nroSeguimiento}`);
    return envio;
  }

  public async create(postEnvioDto: PostEnvioDto): Promise<number> { // TODO: Implementar crear viaje
    const localidadOrigen = await this.localidadRepository.getLocalidad(postEnvioDto.origen.localidadID);
    if (!localidadOrigen) throw CustomError.notFound('La localidad de origen no existe');

    const localidadDestino = await this.localidadRepository.getLocalidad(postEnvioDto.destino.localidadID);
    if (!localidadDestino) throw CustomError.notFound('La localidad de destino no existe');

    const cliente = await this.clienteRepository.getUsuario(postEnvioDto.clienteID);
    if (!cliente) throw CustomError.notFound('El cliente no existe');

    const origen = DomicilioMapper.fromPostDtoToEntity(postEnvioDto.origen, localidadOrigen);
    const destino = DomicilioMapper.fromPostDtoToEntity(postEnvioDto.destino, localidadDestino);
    const envio = EnvioMapper.fromPostDtoToEntity({
      postEnvioDto,
      origen,
      destino,
      cliente
    });

    envio.setNroSeguimiento(randomInt(10000000, 99999999));

    if (!envio.verificarPesoGramos()) throw CustomError.badRequest(`Solo se pueden realizar envíos hasta ${PESO_GRAMOS_MAX / 1000} kilos`);
    envio.setMonto(envio.calcularMonto());

    if (
      envio.getOrigen().getCalle() === envio.getDestino().getCalle() &&
      envio.getOrigen().getNumero() === envio.getDestino().getNumero() &&
      envio.getOrigen().getLocalidad().getID() === envio.getDestino().getLocalidad().getID()
    ) {
      throw CustomError.badRequest('El origen y destino no pueden ser iguales, ni en el mismo edificio');
    }

    envio.verificarRangoHorario();

    // TODO: Implementar crear viaje() para el envio

    // Setea los domicilios con sus IDs si existen, sino los crea
    envio.setOrigen(await this.getOrCreateDomicilio(envio.getOrigen()));
    envio.setDestino(await this.getOrCreateDomicilio(envio.getDestino()));

    const envioExistente = await this.enviosRepository.buscarEnvioIgual(envio);
    if (envioExistente) {
      throw CustomError.badRequest('Ya existe un envío con los mismos datos');
    }

    const nroSeguimiento = await this.enviosRepository.create(envio);
    return nroSeguimiento;
  }

  public async update(nroSeguimiento: number, updateEnvioDto: UpdateEnvioDto): Promise<Envio> {
    const existingEnvio = await this.enviosRepository.getEnvio(nroSeguimiento);
    if (!existingEnvio) throw CustomError.notFound(`No se encontró un envío con el número: ${nroSeguimiento}`);

    if (existingEnvio.getEstado().getID() !== EstadoEnvioEnum.Confirmado) {
      throw CustomError.badRequest(`No se puede modificar un envío con estado: ${existingEnvio.getEstado().getNombre()}`);
    }

    const localidadOrigen = await this.localidadRepository.getLocalidad(updateEnvioDto.origen.localidadID);
    if (!localidadOrigen) throw CustomError.notFound('La localidad de origen no existe');

    const localidadDestino = await this.localidadRepository.getLocalidad(updateEnvioDto.destino.localidadID);
    if (!localidadDestino) throw CustomError.notFound('La localidad de destino no existe');

    const envioToUpdate = EnvioMapper.fromUpdateDtoToEntity({
      updateEnvioDto,
      existingEnvio,
      localidadOrigen,
      localidadDestino
    });

    /* Si el domicilio origen o destino no existen, se crean para evitar modificar los existentes
        y que se modifiquen en otros envios.
    */
    envioToUpdate.setOrigen(await this.getOrCreateDomicilio(envioToUpdate.getOrigen()));
    envioToUpdate.setDestino(await this.getOrCreateDomicilio(envioToUpdate.getDestino()));

    if (updateEnvioDto.pesoGramos !== existingEnvio.getPesoGramos()) {
      envioToUpdate.verificarPesoGramos();
      envioToUpdate.setMonto(envioToUpdate.calcularMonto());
    }

    if (updateEnvioDto.hora.getHours() !== existingEnvio.getHora().getHours()) {
      envioToUpdate.verificarRangoHorario();
    }

    const envioUpdate = await this.enviosRepository.update(envioToUpdate);
    return envioUpdate;
  }

  public async updateEstadoEnvio(nroSeguimiento: number, estadoEnvioID: number) {
    await this.enviosRepository.updateEstadoEnvio(nroSeguimiento, estadoEnvioID);
  }

  public async cancelarEnvio(nroSeguimiento: number): Promise<void> {
    const envio = await this.enviosRepository.getEnvio(nroSeguimiento);
    if (!envio) throw CustomError.notFound(`No se encontró un envío con el número: ${nroSeguimiento}`);

    if (envio.getEstado().getID() !== EstadoEnvioEnum.Confirmado) {
      throw CustomError.badRequest(`No se puede cancelar un envío en estado: ${envio.getEstado().getNombre()}`);
    }
    await this.enviosRepository.cancelarEnvio(nroSeguimiento);
  }

  private async getOrCreateDomicilio(domicilio: Domicilio): Promise<Domicilio> {
    const domicilioExistente = await this.domicilioRepository.getDomicilioByProperties(domicilio);
    if (domicilioExistente) return domicilioExistente;

    const domicilioCreated = await this.domicilioRepository.create(domicilio);
    return domicilioCreated;
  }
}