import { type Checkpoint } from '../../../domain/entities/checkpoint.entity';
import { type Viaje } from '../../../domain/entities/viaje.entity';

export class GetCheckpointDto {
  private constructor(
    public idCheckpoint: number,
    public tipo: string | null,
    public latitud: number,
    public longitud: number,
    public numero: number,
    public id_viaje: Viaje
  ) {}

  public static get(checkpoint: Checkpoint): GetCheckpointDto {
    return new GetCheckpointDto(
      checkpoint.getIdCheckpoint(),
      checkpoint.getTipo(),
      checkpoint.getLatitud(),
      checkpoint.getLongitud(),
      checkpoint.getNumero(),
      checkpoint.getIdViaje()
    );
  }
}

