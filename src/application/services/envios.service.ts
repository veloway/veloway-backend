import { Domicilio } from '../../domain/entities/domicilio.entity';
import { Envio } from '../../domain/entities/envio.entity';
import { type IDomicilioRepository } from '../../domain/repositories/domicilio.interface';
import { type IEnviosRepository } from '../../domain/repositories/envios.interface';
import { type ILocalidadRepository } from '../../domain/repositories/localidad.interface';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';
import { type PostEnvioDto } from '../dtos/envio/postEnvio.dto';
import { CustomError } from '../errors/custom.errors';

// TODO: ver si sigo usando esto xd

export class EnviosService {
  constructor (
    private readonly enviosRepository: IEnviosRepository,
    private readonly domiciliosRepository: IDomicilioRepository,
    private readonly usuariosRepository: IUsuarioRepository,
    private readonly localidadesRepository: ILocalidadRepository
  ) {}

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

  async create(envioDto: PostEnvioDto): Promise<number> {
    // TODO: Ver si se puede mapear dto a un objeto de la entidad, y asi poder trabajar con los metodos de la entidad
    // Luego la entidad se mapea con una entidad de la base de datos para guardarla
    // en la arquitectura de software bien estructurada, el servicio debe trabajar con las entidades de negocio.
    try {
      // Validar que el cliente exista
      const cliente = await this.usuariosRepository.getUsuario(envioDto.clienteID);
      if (!cliente) {
        throw CustomError.notFound('Usuario no encontrado');
      }
      // Validar que la localidad de origen y destino existan
      const localidadOrigen = await this.localidadesRepository.getLocalidad(envioDto.origen.localidadID);
      if (!localidadOrigen) {
        throw CustomError.notFound('La localidad de origen no existe');
      }
      const localidadDestino = await this.localidadesRepository.getLocalidad(envioDto.destino.localidadID);
      if (!localidadDestino) {
        throw CustomError.notFound('La localidad de destino no existe');
      }

      // Crear un objeto de tipo envio
      const envio = new Envio( // TODO: Hacer un mapper de dto a entidad
        envioDto.nroSeguimiento,
        envioDto.descripcion,
        envioDto.fecha,
        envioDto.hora,
        envioDto.pesoGramos,
        envioDto.monto,
        '', // TODO: Esto es para probar , hacer una clase EstadoEnvio en entities
        new Domicilio(
          0, // ID temporal
          envioDto.origen.calle,
          envioDto.origen.numero,
          localidadOrigen,
          envioDto.origen.piso || null,
          envioDto.origen.depto || null,
          envioDto.origen.descripcion || null
        ),
        new Domicilio(
          0,
          envioDto.destino.calle,
          envioDto.destino.numero,
          localidadDestino,
          envioDto.destino.piso || null,
          envioDto.destino.depto || null,
          envioDto.destino.descripcion || null
        ),
        cliente
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

      /* TODO: Validar que la hora en que se quiera realizar el envio este entre las 8:00 y 18:00,
       si no queda para el dia siguiente entre el mismo rango horario. */
      if (envio.verificarRangoHorario()) {
        envio.setFecha(new Date(envio.getFecha().getTime() + 86400000)); // 86400000 = 24 horas en milisegundos (1 dia)
        envio.setHora(new Date(envio.getHora().setHours(8, 0, 0, 0))); // TODO: Verificar si la hora esta bien
      }

      /* TODO: Buscar si hay un conductor disponible para el envio a la misma fecha y hora (Que la busqueda tenga un tiempo limite de 1 minuto)
        Si lo hay crear el viaje con el envio y el conductor, si no, mandar un mensaje al cliente que no hay conductores disponibles
      */

      // Validar que el domicilio de origen y destino existan en la base de datos, si no, crearlos
      const domicilioOrigen = await this.domiciliosRepository.getDomicilioID(envio.getOrigen());

      if (domicilioOrigen) {
        envio.setOrigen(domicilioOrigen);
      } else {
        const origenCreated = await this.domiciliosRepository.create(envio.getOrigen());
        envio.setOrigen(origenCreated);
      }

      const domicilioDestino = await this.domiciliosRepository.getDomicilioID(envio.getDestino());

      if (domicilioDestino) {
        envio.setDestino(domicilioDestino);
      } else {
        const destinoCreated = await this.domiciliosRepository.create(envio.getDestino());
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