import { Coordenadas } from './coordenadas.entity';
import { type Viaje } from './viaje.entity';

export class Checkpoint extends Coordenadas {
  constructor(
    private readonly idCheckpoint: number,
    private numero: number,
    private viaje: Viaje,
    idCoordenadas: number,
    latitud: number,
    longitud: number
  ) {
    super(
      idCoordenadas,
      latitud,
      longitud
    );
    this.idCheckpoint = idCoordenadas;
  }

  // Getters

  public getIdCheckpoint(): number {
    return this.idCheckpoint;
  }

  public getNumero(): number {
    return this.numero;
  }

  public getViaje(): Viaje {
    return this.viaje;
  }

  // Setters
  public setNumero(numero: number): void {
    this.numero = numero;
  }

  public setViaje(viaje: Viaje): void {
    this.viaje = viaje;
  }
}
