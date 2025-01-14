import { type Envio } from './envio.entity';
import { type EstadoConductor } from './estadoConductor.entity';
import { Usuario } from './usuario.entity';

export class Conductor extends Usuario {
  constructor(
    private readonly idConductor: string,
    private compartirFichaMedica: boolean,
    private estadoConductor: EstadoConductor,
    id: string,
    dni: number,
    email: string,
    password: string,
    fechaNac: Date,
    nombre: string,
    apellido: string,
    esConductor: boolean,
    telefono?: string | null,
    envios?: Envio[] | null
  /* foreign que necesito
    private patente: Vehiculos,
  */
  ) {
    super(
      id,
      dni,
      email,
      password,
      fechaNac,
      nombre,
      apellido,
      esConductor,
      telefono,
      envios
    );
    this.idConductor = id;
  }

  // Getters
  public getIdConductor(): string {
    return this.idConductor;
  }

  public getCompartirFichaMedica(): boolean {
    return this.compartirFichaMedica;
  }

  public getEstadoConductor(): EstadoConductor {
    return this.estadoConductor;
  }

  /*
  public getPatente(): Vehiculos {
    return this.patente;
  }
*/
  // Setters
  public setCompartirFichaMedica(compartirFichaMedica: boolean): void {
    this.compartirFichaMedica = compartirFichaMedica;
  }

  public setEstadoConductor(estadoConductor: EstadoConductor): void {
    this.estadoConductor = estadoConductor;
  }
/*
  public getPatente(patente: Vehiculos): void {
    this.patente = patente;
  }
*/
}