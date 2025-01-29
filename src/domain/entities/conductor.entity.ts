import { type EstadoConductor } from './estadoConductor.entity';
import { Usuario } from './usuario.entity';
import { type Domicilio } from './domicilio.entity';

export class Conductor extends Usuario {
  constructor(
    private readonly idConductor: string,
    private estadoConductor: EstadoConductor,
    id: string,
    dni: number,
    email: string,
    password: string,
    fechaNac: Date,
    nombre: string,
    apellido: string,
    esConductor: boolean,
    is_active: boolean,
    api_key: string,
    telefono?: string | null,
    domicilio?: Domicilio | null

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
      is_active,
      api_key,
      telefono,
      domicilio
    );
    this.idConductor = idConductor;
    this.estadoConductor = estadoConductor;
  }

  // Getters
  public getIdConductor(): string {
    return this.idConductor;
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

  public setEstadoConductor(estadoConductor: EstadoConductor): void {
    this.estadoConductor = estadoConductor;
  }
/*
  public getPatente(patente: Vehiculos): void {
    this.patente = patente;
  }
*/
}