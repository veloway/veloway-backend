
export class Conductor {
  constructor(
    private readonly idConductor: number,
    private compartirFichaMedica: boolean
  /* foreign que necesito
    private dni: Usuarios,
    private idEstado: Estaado_conductores,
    private numeroLicencia: Licencias,
    private idFichaMedica: Fichas_medicas,
    private patente: Vehiculos,
*/
  ) {}

  // Getters
  public getIdConductor(): number {
    return this.idConductor;
  }

  public getCompartirFichaMedica(): boolean {
    return this.compartirFichaMedica;
  }

  /*
  public getDni(): Usuarios {
    return this.dni;
  }

  public getIdEstado(): Estado_conductores {
    return this.idEstado;
  }

  public getNumeroLicencia(): Licencias {
    return this.NumeroLIcencia;
  }

  public getIdFichaMedica(): Fichas_medicas {
    return this.idFichaMedica;
  }

  public getPatente(): Vehiculos {
    return this.patente;
  }
*/
  // Setters
  public setCompartirFichaMedica(compartirFichaMedica: boolean): void {
    this.compartirFichaMedica = compartirFichaMedica;
  }
/*
  public getDni(dni: Usuarios): void {
    this.dni = dni;
  }

  public getIdEstado(idEstado: Estado_conductores): void {
    this.idEstado = idEstado;
  }

  public getNumeroLicencia(numeroLicencia: Licencias): void {
    this.NumeroLIcencia = numeroLicencia;
  }

  public getIdFichaMedica(fichaMedica: Fichas_medicas): void {
    this.idFichaMedica = fichaMedica;
  }

  public getPatente(patente: Vehiculos): void {
    this.patente = patente;
  }
*/
}