export class EstadoVehiculo {
  constructor(
    public id: number,
    public nombre: string
  ) {}

  public getID(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }


  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setID(id: number): void {
    this.id = id;
  }
}

