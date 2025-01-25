import { type Envio } from './envio.entity';
import { type EstadoConductor } from './estadoConductor.entity';
import { Usuario } from './usuario.entity';
import { Domicilio } from './domicilio.entity';

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
    is_active: boolean,
    api_key: string,
    telefono?: string | null,
    domicilio?: Domicilio | null,
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
      is_active,
      api_key,
      telefono,
      domicilio,
      envios
    );
    this.idConductor = idConductor;
    this.compartirFichaMedica = compartirFichaMedica;
    this.estadoConductor = estadoConductor;
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