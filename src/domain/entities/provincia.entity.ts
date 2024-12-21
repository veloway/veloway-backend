import { type Localidad } from './localidad.entity';

export class Provincia {
  constructor(
    private idProvincia: number,
    private nombre: string,
    private localidades?: Localidad[]
  ) {}

  // Getters
  public getIdProvincia(): number {
    return this.idProvincia;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getLocalidades(): Localidad[] | undefined {
    return this.localidades;
  }

  // Setters

  public setIdProvincia(idProvincia: number): void {
    this.idProvincia = idProvincia;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setLocalidades(localidades: Localidad[]): void {
    this.localidades = localidades;
  }

  public addLocalidad(localidad: Localidad): void {
    if (this.localidades) {
      this.localidades.push(localidad);
    } else {
      this.localidades = [localidad];
    }
  }
}