import { type Viaje } from './viaje.entity';

export class Checkpoint {
  constructor(
    private readonly idCheckpoint: number,
    private tipo: string | null,
    private latitud: number,
    private longitud: number,
    private numero: number,
    private idViaje: Viaje
  ) {}

  // Getters
  public getIdCheckpoint(): number {
    return this.idCheckpoint;
  }

  public getTipo(): string | null {
    return this.tipo;
  }

  public getLatitud(): number {
    return this.latitud;
  }

  public getLongitud(): number {
    return this.longitud;
  }

  public getNumero(): number {
    return this.numero;
  }

  public getIdViaje(): Viaje {
    return this.idViaje;
  }

  // Setters
  public setTipo(tipo: string | null): void {
    this.tipo = tipo;
  }

  public setLatitud(latitud: number): void {
    this.latitud = latitud;
  }

  public setLongitud(longitud: number): void {
    this.longitud = longitud;
  }

  public setNumero(numero: number): void {
    this.numero = numero;
  }

  public setIdViaje(idViaje: Viaje): void {
    this.idViaje = idViaje;
  }
}
