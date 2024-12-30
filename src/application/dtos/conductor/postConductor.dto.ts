import { type Conductor } from '../../../domain/entities/conductor.entity';
import { postConductorValidation } from '../../validations/conductor/postConductor.validation';

export class PostConductorDto {
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

  public static create(conductor: Conductor): [string?, PostConductorDto?] {
    const conductorValidation = postConductorValidation(conductor);

    if (!conductorValidation.success) {
      return [JSON.parse(conductorValidation.error.message)];
    }

    return [undefined, new PostConductorDto(
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