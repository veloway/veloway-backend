import { type EnviosI, type Envio, type UsuarioI, type DomicilioI } from '../../domain';
import { normalizeText } from '../../utils';
import { type PostEnvioDto } from '../dtos';
import { CustomError } from '../errors';

export class EnviosService {
  constructor (
    private readonly enviosRepository: EnviosI,
    private readonly domiciliosRepository: DomicilioI,
    // private readonly localidadesRepository: LocalidadesI,
    // private readonly provinciasRepository: ProvinciasI,
    private readonly usuariosRepository: UsuarioI
  ) {
    this.enviosRepository = enviosRepository;
    this.usuariosRepository = usuariosRepository;
    this.domiciliosRepository = domiciliosRepository;
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
      // TODO: PROBAR TODAS LA VALIDACIONES

      // Valida que el clienteID exista en la base de datos
      const cliente = await this.usuariosRepository.getUsuario(envio.clienteID);
      if (!cliente) {
        throw CustomError.notFound('Usuario no encontrado');
      }
      // Valida que el origen y destino sean distintos
      if (
        envio.origen.calle === envio.destino.calle &&
        envio.origen.numero === envio.destino.numero &&
        envio.origen.localidad.codigoPostal === envio.destino.localidad.codigoPostal &&
        normalizeText(envio.origen.localidad.provincia.nombre) === normalizeText(envio.destino.localidad.provincia.nombre)
      ) {
        throw CustomError.badRequest('El origen y destino no pueden ser iguales, ni en el mismo edificio');
      }
      // Valida que el domicilio de origen y destino existan en la base de datos, si no, crearlos
      const domicilioOrigenID = await this.domiciliosRepository.getDomicilio(
        envio.origen.calle,
        envio.origen.numero,
        envio.origen.localidad.codigoPostal,
        envio.origen.localidad.provincia.nombre,
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
        envio.destino.localidad.codigoPostal,
        envio.destino.localidad.provincia.nombre,
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
