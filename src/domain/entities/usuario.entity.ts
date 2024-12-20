export class Usuario {
  constructor(
    private id_usuario: string,
    private dni: number,
    private email: string,
    private password: string,
    private fecha_nac: Date,
    private nombre: string,
    private apellido: string,
    private es_conductor: boolean,
    private telefono?: string
  ) {
    this.id_usuario = id_usuario;
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.fecha_nac = fecha_nac;
    this.nombre = nombre;
    this.apellido = apellido;
    this.es_conductor = es_conductor;
    this.telefono = telefono;
  }

  // Getters
  public getIdUsuario(): string {
    return this.id_usuario;
  }

  public getDni(): number {
    return this.dni;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getFechaNac(): Date {
    return this.fecha_nac;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getEsConductor(): boolean {
    return this.es_conductor;
  }

  public getTelefono(): string | undefined {
    return this.telefono;
  }
}