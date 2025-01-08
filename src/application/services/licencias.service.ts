import { ILicencia } from "../../domain/repositories/licencia.interface";
import { Licencia } from "../../domain/entities/licencia.entity";

export class LicenciasService{
    constructor (private licenciaRepository: ILicencia){}

}