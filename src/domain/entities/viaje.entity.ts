import { type Checkpoint } from './checkpoint.entity';
import { type Envio } from './envio.entity';
import { type Conductor } from './conductor.entity';

export class Viaje {
  constructor(
    private readonly idViaje: number,
    private checkpointActual: number,
    private fechaInicio: Date,
    private fechaFin: Date,
    private idConductor: Conductor,
    private nroSeguimiento: Envio,
    private origenCord: Checkpoint,
    private destinoCord: Checkpoint
  ) {}

  // Getters
  public getIdViaje(): number {
    return this.idViaje;
  }

  public getCheckpointActual(): number {
    return this.checkpointActual;
  }

  public getFechaInicio(): Date {
    return this.fechaInicio;
  }

  public getFechaFin(): Date {
    return this.fechaFin;
  }

  public getConductor(): Conductor {
    return this.idConductor;
  }


  public getNroSeguimiento(): Envio {
    return this.nroSeguimiento;
  }

  public getOrigenCord(): Checkpoint {
    return this.origenCord;
  }

  public getDestinoCord(): Checkpoint {
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


  public setNroSeguimiento(nroSeguimiento: Envio): void {
    this.nroSeguimiento = nroSeguimiento;
  }

  public setOrigenCord(origenCord: Checkpoint): void {
    this.origenCord = origenCord;
  }

  public setDestinoCord(destinoCord: Checkpoint): void {
    this.destinoCord = destinoCord;
  }
}


