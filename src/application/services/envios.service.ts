import { type Envio } from '../../domain/entities/envio.entity';
import { type DomicilioI } from '../../domain/interfaces/domicilio.interface';
import { type EnviosI } from '../../domain/interfaces/envios.interface';
import { type LocalidadI } from '../../domain/interfaces/localidad.interface';
import { type UsuarioI } from '../../domain/interfaces/usuario.interface';
import { type PostEnvioDto } from '../dtos/envio/postEnvio.dto';
import { CustomError } from '../errors/custom.errors';

export class EnviosService {
  constructor (
    private readonly enviosRepository: EnviosI,
    private readonly domiciliosRepository: DomicilioI,
    private readonly usuariosRepository: UsuarioI,
    private readonly localidadesRepository: LocalidadI
  ) {
    this.enviosRepository = enviosRepository;
    this.usuariosRepository = usuariosRepository;
    this.domiciliosRepository = domiciliosRepository;
    this.localidadesRepository = localidadesRepository;
  }

  async getAll(): Promise<Envio[]> {
    try {
      const envios = await this.enviosRepository.getAll();
      return envios;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof Error) {
        throw CustomError.internalServerError(error.message);
      }
      throw CustomError.internalServerError();
    }
  }

  async create(envio: PostEnvioDto): Promise<void> {
    // TODO: Ver si se puede mapear dto a un objeto de la entidad, y asi poder trabajar con los metodos de la entidad
    // Luego la entidad se mapea con una entidad de la base de datos para guardarla
    // en la arquitectura de software bien estructurada, el servicio debe trabajar con las entidades de negocio.
    try {
      // Validar que el cliente exista
      const cliente = await this.usuariosRepository.getUsuario(envio.clienteID);
      if (!cliente) {
        throw CustomError.notFound('Usuario no encontrado');
      }

      // Validar que la localidad exista
      const localidadOrigen = await this.localidadesRepository.getLocalidad(envio.origen.localidadID);
      if (!localidadOrigen) {
        throw CustomError.notFound('La localidad de origen no existe');
      }
      const localidadDestino = await this.localidadesRepository.getLocalidad(envio.destino.localidadID);
      if (!localidadDestino) {
        throw CustomError.notFound('La localidad de destino no existe');
      }

      // Validar que el origen y destino no sean iguales
      if (
        envio.origen.calle === envio.destino.calle &&
        envio.origen.numero === envio.destino.numero &&
        envio.origen.localidadID === envio.destino.localidadID
      ) {
        throw CustomError.badRequest('El origen y destino no pueden ser iguales, ni en el mismo edificio');
      }

      /* TODO: Validar que la hora en que se quiera realizar el envio este entre las 8:00 y 18:00,
       si no queda para el dia siguiente entre el mismo rango horario. */

      /* TODO: Buscar si hay un conductor disponible para el envio a la misma fecha y hora (Que la busqueda tenga un tiempo limite de 1 minuto)
        Si lo hay crear el viaje con el envio y el conductor, si no, mandar un mensaje al cliente que no hay conductores disponibles
      */

      // Validar que el domicilio de origen y destino existan en la base de datos, si no, crearlos
      const domicilioOrigenID = await this.domiciliosRepository.getDomicilio(envio.origen);

      if (domicilioOrigenID) {
        envio.origenID = domicilioOrigenID;
      } else {
        const newOrigenID = await this.domiciliosRepository.create(envio.origen);
        envio.origenID = newOrigenID;
      }

      const domicilioDestinoID = await this.domiciliosRepository.getDomicilio(envio.destino);

      if (domicilioDestinoID) {
        envio.destinoID = domicilioDestinoID;
      } else {
        const newDestinoID = await this.domiciliosRepository.create(envio.destino);
        envio.destinoID = newDestinoID;
      }

      // Validar que no haya un envio con los mismos datos
      if (domicilioDestinoID && domicilioOrigenID) {
        const envioExistente = await this.enviosRepository.buscarEnvioIgual(envio);
        if (envioExistente) {
          throw CustomError.badRequest('Ya existe un envio con los mismos datos');
        }
      }

      // Crear el envio
      await this.enviosRepository.create(envio);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof Error) {
        throw CustomError.internalServerError(error.message);
      }
      throw CustomError.internalServerError();
    }
  }

  // TODO: Implementar buscar envio por numero de seguimiento

  // TODO: Implementar actualizar envio

  // TODO: Implementar eliminar envio

  // TODO: Implementar buscar envios por cliente

  // TODO: Implementar buscar envios por estado, origen y destino, paginado, ordenado por fecha, etc.
}