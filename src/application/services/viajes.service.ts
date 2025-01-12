import { Coordenada } from '../../domain/entities/coordenada.entity';
import { type Envio } from '../../domain/entities/envio.entity';
import { Viaje } from '../../domain/entities/viaje.entity';
import { ICoordenadaRepository } from '../../domain/repositories/coordenadas.interface';
import { IViajeRepository } from '../../domain/repositories/viajes.interface';
import { Inject, Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { obtenerCoordDestino, obtenerCoordOrigen } from '../../infrastructure/geocodingAPI/geocodingApi';
import { CustomError } from '../errors/custom.errors';

@Injectable()
export class ViajesService {
  constructor (
    @Inject(REPOSITORIES_TOKENS.IViajesRepository) private readonly viajeRepository: IViajeRepository,
    @Inject(REPOSITORIES_TOKENS.ICoordenadasRepository) private readonly coordenadaRepository: ICoordenadaRepository
  ) {}

  // recupera un viaje
  public async getViaje(viajeId: number): Promise<Viaje> {
    const viaje = await this.viajeRepository.getViaje(viajeId);

    if (!viaje) throw CustomError.notFound('No se encontro un envio con ese id');
    return viaje;
  }

  // recupera todos los viajes de un conductor
  public async getAllByConductoresId(conductorId: string): Promise<Viaje[]> {
    const viajes = await this.viajeRepository.getAllByConductorId(conductorId);
    if (viajes.length === 0) throw CustomError.notFound('No se encontraron viajes');
    return viajes;
  }

  // crea un viaje
  public async create(envio: Envio, idConductor: string): Promise<number> {
    const origenData = await obtenerCoordOrigen(envio);
    const destinoData = await obtenerCoordDestino(envio);

    if (!origenData || !destinoData) throw CustomError.notFound('No se encontraron coordenandas');

    // create Coordenadas
    const origen = new Coordenada(0, origenData.latitud, origenData.longitud);
    const destino = new Coordenada(0, destinoData.latitud, destinoData.longitud);

    // Guardo las coordenadas en la base de datos
    const origenId = await this.coordenadaRepository.create(origen);
    const destinoId = await this.coordenadaRepository.create(destino);

    if (!origenId || !destinoId) {
      throw CustomError.internalServerError('Error al guardar las coordenadas');
    }

    // actualizo los id
    origen.setIdCoordenada(origenId);
    destino.setIdCoordenada(destinoId);

    const newViaje = new Viaje(
      0,
      1,
      envio.getHora(), // Despues lo cambio
      null,
      idConductor,
      envio,
      origen,
      destino
    );

    const viajeId = await this.viajeRepository.create(newViaje);
    return viajeId;
  }
}

// modificar la base de datos real