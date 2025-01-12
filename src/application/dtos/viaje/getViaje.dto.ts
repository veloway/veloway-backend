import { type Coordenada } from '../../../domain/entities/coordenada.entity';
import { type Viaje } from '../../../domain/entities/viaje.entity';

export class GetViajeDto {
  private constructor(
    public checkpointActual: number,
    public idConductor: string,
    public nroSeguimiento: number,
    public origenCord: Coordenada,
    public destinoCord: Coordenada,
    public fechaInicio?: string | null,
    public fechaFin?: string | null
  ) {}

  public static create(viaje: Viaje): GetViajeDto {
    return new GetViajeDto(
      viaje.getCheckpointActual(),
      viaje.getIdConductor(),
      viaje.getEnvio().getNroSeguimiento(),
      viaje.getOrigenCord(),
      viaje.getDestinoCord(),
      viaje.getFechaInicio(),
      viaje.getFechaFin()
    );
  }
}

