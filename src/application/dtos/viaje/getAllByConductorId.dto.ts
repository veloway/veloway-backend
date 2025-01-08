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
    const fechaFin = viaje.getFechaFin()?.toISOString().split('T')[0];
    const fechaInicio = viaje.getFechaInicio()?.toISOString().split('T')[0];

    return new GetAllByConductorIdDto(
      viaje.getIdViaje(),
      viaje.getConductor().getIdConductor(),
      viaje.getEnvio().getNroSeguimiento(),
      fechaFin,
      fechaInicio
    );
  }
}
