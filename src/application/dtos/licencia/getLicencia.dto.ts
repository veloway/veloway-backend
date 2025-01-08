import { type Licencia } from "../../../domain/entities/licencia.entity";
// import { GetConductorDto }

export class GetLicenciaDto {
    private constructor(
        public categoria: string,
        public fechaVenc: Date,
        public numero: number,
      //  public idConductor: GetConductorDto;
    ) {}
    
    public static create(licencia: Licencia): GetLicenciaDto{
        return new GetLicenciaDto(
            licencia.getCategoria(),
            licencia.getFechaVenc(),
            licencia.getNumero(),
            //GetConductorDto.create(licencia.getConductor)
        )
    }
}
