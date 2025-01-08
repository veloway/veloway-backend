export class Coordenadas {
  constructor(
    private readonly idCoordenadas: number,
    private latitud: number,
    private longitud: number
  ) {}

  // Geters
  public getIdCoordenas(): number {
    return this.idCoordenadas;
  }

  public getLatitud(): number {
    return this.latitud;
  }

  public getLongitud(): number {
    return this.longitud;
  }

  // Setters
  public setLatitud(latitud: number): void {
    this.latitud = latitud;
  }

  public setLongitud(longitud: number): void {
    this.longitud = longitud;
  };
}