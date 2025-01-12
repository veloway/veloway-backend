import { type Viaje } from '../../../domain/entities/viaje.entity';

export class GetAllByConductorIdDto {
  private constructor(
    public idViaje: number,
    public idConductor: string,
    public nroSeguimiento: number,
    public fechaFin?: string | null,
    public fechaInicio?: string | null
  ) {}

  public static create(viaje: Viaje): GetAllByConductorIdDto {
    return new GetAllByConductorIdDto(
      viaje.getIdViaje(),
      viaje.getIdConductor(),
      viaje.getEnvio().getNroSeguimiento(),
      viaje.getFechaFin(),
      viaje.getFechaInicio()
    );
  }
}
