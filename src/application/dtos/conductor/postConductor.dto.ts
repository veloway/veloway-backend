import { postConductorValidation } from "../../validations/conductor/postConductor.validation";
import { EstadoConductor } from "../../../domain/entities/estadoConductor.entity";

export class PostCondutorDto {
  private constructor(
        //atributos conductor
        public idUsuario: string,
        public compartirFichaMedica: boolean,
        //public estadoConductor: EstadoConductor,
        //public vehiculo: Vehiculo,
        //public licensia: Licensia

  ) {}

  public static create(conductor: any, id: string): [string?, PostCondutorDto?] {
    const driverValidation = postConductorValidation(conductor);

    if (driverValidation.error) {
      return [JSON.parse(driverValidation.error.message)];
    }


    return [undefined, new PostCondutorDto(
        driverValidation.data.email,
        driverValidation.data.shareMedicalRecord,
        
        // driverValidation.data.licenseExpiration
        // driverValidation.data.estadoConductor
        
    )];
  }

  }
