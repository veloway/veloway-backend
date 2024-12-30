import { type Checkpoint } from '../../../domain/entities/checkpoint.entity';
import { type Conductor } from '../../../domain/entities/conductor.entity';
import { type Envio } from '../../../domain/entities/envio.entity';
import { type Viaje } from '../../../domain/entities/viaje.entity';
import { getViajeValidation } from '../../validations/viaje/getViaje.validation';

export class GetViajeDto {
  private constructor(
    public checkpointActual: number,
    public fechaFin: Date,
    public fechaInicio: Date,
    public idConductor: Conductor,
    public nroSeguimiento: Envio,
    public origenCord: Checkpoint,
    public destinoCord: Checkpoint
  ) {}

  public static create(viaje: Viaje): [string?, GetViajeDto?] {
    const viajeValidation = getViajeValidation(viaje);

    if (!viajeValidation.success) {
      return [JSON.parse(viajeValidation.error.message)];
    }

    const fechaFin = new Date(viajeValidation.data.fechaFin);
    const fechaInicio = new Date(viajeValidation.data.fechaInicio);

    return [undefined, new GetViajeDto(
      viaje.getCheckpointActual(),
      fechaFin,
      fechaInicio,
      viaje.getConductor(),
      viaje.getNroSeguimiento(),
      viaje.getOrigenCord(),
      viaje.getDestinoCord()
    )];
  }
}

