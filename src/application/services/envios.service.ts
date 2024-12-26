import { randomInt } from 'crypto';
import { type Envio } from '../../domain/entities/envio.entity';
import { type IDomicilioRepository } from '../../domain/repositories/domicilio.interface';
import { type IEnviosRepository } from '../../domain/repositories/envios.interface';
import { type PostEnvioDto } from '../dtos/envio/postEnvio.dto';
import { type UpdateEnvioDto } from '../dtos/envio/udpateEnvio.dto';
import { CustomError } from '../errors/custom.errors';
import { type EnvioMapper } from '../mappers/envio.mapper';
import { EstadoEnvioEnum } from '../../types/estadoEnvio.type';

export class EnviosService {
  constructor (
    private readonly enviosRepository: IEnviosRepository,
    private readonly domicilioRepository: IDomicilioRepository,
    private readonly envioMapper: EnvioMapper
  ) {}

  async getAll(): Promise<Envio[]> {
    const envios = await this.enviosRepository.getAll();
    return envios;
  }

  async create(envioDto: PostEnvioDto): Promise<number> {
    const newNroSeguimiento = randomInt(10000000, 99999999);
    const envio = await this.envioMapper.fromPostDtoToEntity(
      envioDto,
      newNroSeguimiento,
      EstadoEnvioEnum.Confirmado
    );

    // TODO: Validar que el peso no exceda los 20000 gramos??

    // Validar que el origen y destino no sean iguales
    if (
      envio.getOrigen().getCalle() === envio.getDestino().getCalle() &&
        envio.getOrigen().getNumero() === envio.getDestino().getNumero() &&
        envio.getOrigen().getLocalidad().getID() === envio.getDestino().getLocalidad().getID()
    ) {
      throw CustomError.badRequest('El origen y destino no pueden ser iguales, ni en el mismo edificio');
    }

    /* Validar que la hora en que se quiera realizar el envio este entre las 8:00 y 18:00,
       si no queda para el dia siguiente entre el mismo rango horario. */
    if (envio.verificarRangoHorario()) {
      envio.setFecha(new Date(envio.getFecha().getTime() + 86400000)); // 86400000 = 24 horas en milisegundos (1 dia)
      envio.setHora(new Date(envio.getHora().setHours(8, 0, 0, 0))); // TODO: Verificar si la hora esta bien
    }

    /* TODO: Buscar si hay un conductor disponible para el envio a la misma fecha y hora (Que la busqueda tenga un tiempo limite de 1 minuto)
        Si lo hay crear el viaje con el envio y el conductor, si no, mandar un mensaje al cliente que no hay conductores disponibles
      */

    // Validar que el domicilio de origen y destino existan en la base de datos, si no, crearlos
    const domicilioOrigen = await this.domicilioRepository.getDomicilioID(envio.getOrigen());

    if (domicilioOrigen) {
      envio.setOrigen(domicilioOrigen);
    } else {
      const origenCreated = await this.domicilioRepository.create(envio.getOrigen());
      envio.setOrigen(origenCreated);
    }

    const domicilioDestino = await this.domicilioRepository.getDomicilioID(envio.getDestino());

    if (domicilioDestino) {
      envio.setDestino(domicilioDestino);
    } else {
      const destinoCreated = await this.domicilioRepository.create(envio.getDestino());
      envio.setDestino(destinoCreated);
    }

    // Validar que no haya un envio con los mismos datos
    if (domicilioOrigen && domicilioDestino) {
      const envioExistente = await this.enviosRepository.buscarEnvioIgual(envio);
      if (envioExistente) {
        throw CustomError.badRequest('Ya existe un envio con los mismos datos');
      }
    }

    // Crear el envio
    const nroSeguimiento = await this.enviosRepository.create(envio);
    return nroSeguimiento;
  }

  public async getEnvio(nroSeguimiento: number): Promise<Envio> {
    const envio = await this.enviosRepository.getEnvio(nroSeguimiento);

    if (!envio) throw CustomError.notFound('No se encontró un envío con ese número');
    return envio;
  }

  public async getEnvioByCliente(idCliente: string): Promise<Envio[]> {
    const envio = await this.enviosRepository.getAllByClienteID(idCliente);
    return envio;
  }

  // TODO: Implementar actualizar envio
  public async update(envioDto: UpdateEnvioDto): Promise<Envio> {
    const envio = await this.envioMapper.fromUpdateDtoToEntity(envioDto);

    const envioUpdate = await this.enviosRepository.update(envio.getNroSeguimiento(), envio);
    return envioUpdate;
  }


  // TODO: Implementar eliminar envio


  // TODO: Implementar buscar envios por estado, origen y destino, paginado, ordenado por fecha, etc.
}