import { Domicilio } from '../../domain/entities/domicilio.entity';
import { Envio } from '../../domain/entities/envio.entity';
import { EstadoEnvio } from '../../domain/entities/estadoEnvio.entity';
import { type Usuario } from '../../domain/entities/usuario.entity';
import { type IDomicilioRepository } from '../../domain/repositories/domicilio.interface';
import { type IEnviosRepository } from '../../domain/repositories/envios.interface';
import { type ILocalidadRepository } from '../../domain/repositories/localidad.interface';
import { type PostEnvioDto } from '../dtos/envio/postEnvio.dto';
import { type UpdateEnvioDto } from '../dtos/envio/updateEnvio.dto';
import { CustomError } from '../errors/custom.errors';

export class EnviosService {
  constructor (
    private readonly enviosRepository: IEnviosRepository,
    private readonly domiciliosRepository: IDomicilioRepository,
    private readonly localidadesRepository: ILocalidadRepository
  ) {}

  async getAll(): Promise<Envio[]> {
    const envios = await this.enviosRepository.getAll();
    return envios;
  }

  async create(envioDto: PostEnvioDto, cliente: Usuario): Promise<number> {
    // TODO: Hacer tambien un localidad service para buscar las localidades, hacerlo en el controller y pasarlas como parametro
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
      new EstadoEnvio(
        envioDto.estadoID,
        ''
      ),
      new Domicilio(
        0, // ID temporal
        envioDto.origen.calle,
        envioDto.origen.numero,
        localidadOrigen,
        envioDto.origen.piso,
        envioDto.origen.depto,
        envioDto.origen.descripcion
      ),
      new Domicilio(
        0,
        envioDto.destino.calle,
        envioDto.destino.numero,
        localidadDestino,
        envioDto.destino.piso,
        envioDto.destino.depto,
        envioDto.destino.descripcion
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
  public async update(updateEnvioDto: UpdateEnvioDto): Promise<Envio> {
    const envioExistente = await this.enviosRepository.getEnvio(updateEnvioDto.nroSeguimiento);
    if (!envioExistente) throw CustomError.notFound('No se encontró un envío con ese número');

    const envio = await this.enviosRepository.update(envioExistente.getNroSeguimiento(), updateEnvioDto);
    return envio;
  }


  // TODO: Implementar eliminar envio


  // TODO: Implementar buscar envios por estado, origen y destino, paginado, ordenado por fecha, etc.
}