import { type Coordenada } from '../../../domain/entities/coordenada.entity';
import { type Viaje } from '../../../domain/entities/viaje.entity';

export class GetViajeDto {
  private constructor(
    public checkpointActual: number,
    public fechaFin: string,
    public fechaInicio: string,
    public idConductor: string,
    public nroSeguimiento: number,
    public origenCord: Coordenada,
    public destinoCord: Coordenada
  ) {}

  public static create(viaje: Viaje): GetViajeDto {
    const fechaFin = viaje.getFechaFin()?.toISOString().split('T')[0] || '';
    const fechaInicio = viaje.getFechaInicio()?.toISOString().split('T')[0] || '';

    return new GetViajeDto(
      viaje.getCheckpointActual(),
      fechaFin,
      fechaInicio,
      viaje.getIdConductor(),
      viaje.getEnvio().getNroSeguimiento(),
      viaje.getOrigenCord(),
      viaje.getDestinoCord()
    );
  }
}