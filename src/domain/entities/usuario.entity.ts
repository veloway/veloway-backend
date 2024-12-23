import { type Envio } from './envio.entity';

export class Usuario {
  constructor(
    private idUsuario: string,
    private dni: number,
    private email: string,
    private password: string,
    private fechaNac: Date,
    private nombre: string,
    private apellido: string,
    private esConductor: boolean,
    private telefono?: string | null,
    private envios?: Envio[] | null
  ) {}

  // Getters
  public getIdUsuario(): string {
    return this.idUsuario;
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
    return this.fechaNac;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getEsConductor(): boolean {
    return this.esConductor;
  }

  public getTelefono(): string | null | undefined {
    return this.telefono;
  }

  public getEnvios(): Envio[] | null | undefined {
    return this.envios;
  }
}