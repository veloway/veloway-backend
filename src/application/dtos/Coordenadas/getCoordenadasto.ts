import { type Coordenadas } from '../../../domain/entities/coordenadas.entity';

export class GetCoordendasDto {
  private constructor (
    public idCoordenadas: number,
    public latitud: number,
    public longitud: number
  ) {}

  public static create(coordenadas: Coordenadas): GetCoordendasDto {
    return new GetCoordendasDto(
      coordenadas.getIdCoordenas(),
      coordenadas.getLatitud(),
      coordenadas.getLongitud()
    );
  }
}