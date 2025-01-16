import { type PostLicenciaDto } from "../dtos/licencia/postLicencia.dto";
import { Licencia } from "../../domain/entities/licencia.entity";
//Importar conductor y su mapper

export class LicenciaMapper{
    public static fromPostDtoToEntity(postLicenciaDto: PostLicenciaDto): Licencia {

        const { categoria, fechaVenc, numero } = postLicenciaDto;

        return new Licencia(
            categoria, 
            new Date(fechaVenc), 
            numero
        );
    }
}



