import { type Envio } from './envio.entity';
import { type Conductor } from './conductor.entity';
import { type Coordenadas } from './coordenadas.entity';

export class Viaje {
  constructor(
    private readonly idViaje: number,
    private checkpointActual: number,
    private fechaInicio: Date | null,
    private fechaFin: Date | null,
    private idConductor: Conductor,
    private envio: Envio,
    private origenCord: Coordenadas,
    private destinoCord: Coordenadas
  ) {}

  // Getters
  public getIdViaje(): number {
    return this.idViaje;
  }

  public getCheckpointActual(): number {
    return this.checkpointActual;
  }

  public getFechaInicio(): Date | null {
    return this.fechaInicio;
  }

  public getFechaFin(): Date | null {
    return this.fechaFin;
  }

  public getConductor(): Conductor {
    return this.idConductor;
  }


  public getEnvio(): Envio {
    return this.envio;
  }

  public getOrigenCord(): Coordenadas {
    return this.origenCord;
  }

  public getDestinoCord(): Coordenadas {
    return this.destinoCord;
  }

  // Setters
  public setCheckpointActual(checkpointActual: number): void {
    this.checkpointActual = checkpointActual;
  }

  public setFechaInicio(fechaInicio: Date): void {
    this.fechaInicio = fechaInicio;
  }

  public setFechaFin(fechaFin: Date): void {
    this.fechaFin = fechaFin;
  }

  public setConductor(conductor: Conductor): void {
    this.idConductor = conductor;
  }


  public setEnvio(envio: Envio): void {
    this.envio = envio;
  }

  public setOrigenCord(origenCord: Coordenadas): void {
    this.origenCord = origenCord;
  }

  public setDestinoCord(destinoCord: Coordenadas): void {
    this.destinoCord = destinoCord;
  }
}


