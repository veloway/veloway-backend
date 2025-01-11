import { type Conductor } from '../../../domain/entities/conductor.entity';
import { postConductorValidation } from '../../validations/conductor/postConductor.validation';

export class GetConductorDto {
  private constructor(
    public compartirFichaMedica: boolean
    /* foreign que necesito
    public dni: PostUsuariosDto,
    public idEstado: PostEstaado_conductoresDto,
    public numeroLicencia: PostLicenciasDto,
    public idFichaMedica: PostFichas_medicasDto,
    public patente: PostVehiculosDto,
*/
  ) {}

  public static create(conductor: Conductor): [string?, GetConductorDto?] {
    const conductorValidation = postConductorValidation(conductor);

    if (!conductorValidation.success) {
      return [JSON.parse(conductorValidation.error.message)];
    }

    return [undefined, new GetConductorDto(
      conductorValidation.data.compartirFichaMedica
      /* foreign que necesito
        public dni: PostUsuariosDto,
        public idEstado: PostEstaado_conductoresDto,
        public numeroLicencia: PostLicenciasDto,
        public idFichaMedica: PostFichas_medicasDto,
        public patente: PostVehiculosDto,
    */
    )];
  }
}