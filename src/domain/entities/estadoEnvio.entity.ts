export class EstadoEnvio {
  constructor(
    private idEstado: number,
    private nombre: string
  ) {}

  // Getters
  public getIdEstado(): number {
    return this.idEstado;
  }

  public getNombre(): string {
    return this.nombre;
  }
}