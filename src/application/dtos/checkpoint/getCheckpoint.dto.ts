import { type Checkpoint } from '../../../domain/entities/checkpoint.entity';
import { type Viaje } from '../../../domain/entities/viaje.entity';

export class GetCheckpointDto {
  private constructor(
    public idCoordenadas: number,
    public latitud: number,
    public longitud: number,
    public numero: number,
    public id_viaje: Viaje
  ) {}

  public static get(checkpoint: Checkpoint): GetCheckpointDto {
    return new GetCheckpointDto(
      checkpoint.getIdCoordenas(),
      checkpoint.getLatitud(),
      checkpoint.getLongitud(),
      checkpoint.getNumero(),
      checkpoint.getViaje()
    );
  }
}

