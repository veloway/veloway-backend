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
    try {
      // Validacion que el cliente exista
      const cliente = await this.usuariosRepository.getUsuario(envio.clienteID);
      if (!cliente) {
        throw CustomError.notFound('Usuario no encontrado');
      }

      // Validar que la localidad exista
      const localidad = await this.localidadesRepository.getLocalidad(envio.origen.localidadID);
      if (!localidad) {
        throw CustomError.notFound('La localidad de origen no existe');
      }
      const localidadDestino = await this.localidadesRepository.getLocalidad(envio.destino.localidadID);
      if (!localidadDestino) {
        throw CustomError.notFound('La localidad de destino no existe');
      }

      // Validacion que el origen y destino no sean iguales
      if (
        envio.origen.calle === envio.destino.calle &&
        envio.origen.numero === envio.destino.numero &&
        envio.origen.localidadID === envio.destino.localidadID
      ) {
        throw CustomError.badRequest('El origen y destino no pueden ser iguales, ni en el mismo edificio');
      }

      // Validacion que el domicilio de origen y destino existan en la base de datos, si no, crearlos
      const domicilioOrigenID = await this.domiciliosRepository.getDomicilio(
        envio.origen.calle,
        envio.origen.numero,
        envio.origen.localidadID,
        envio.origen.piso,
        envio.origen.depto
      );

      if (domicilioOrigenID) {
        envio.origenID = domicilioOrigenID;
      } else {
        const newOrigenID = await this.domiciliosRepository.create(envio.origen);
        envio.origenID = newOrigenID;
      }

      const domicilioDestinoID = await this.domiciliosRepository.getDomicilio(
        envio.destino.calle,
        envio.destino.numero,
        envio.destino.localidadID,
        envio.destino.piso,
        envio.destino.depto
      );

      if (domicilioDestinoID) {
        envio.destinoID = domicilioDestinoID;
      } else {
        const newDestinoID = await this.domiciliosRepository.create(envio.destino);
        envio.destinoID = newDestinoID;
      }

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
