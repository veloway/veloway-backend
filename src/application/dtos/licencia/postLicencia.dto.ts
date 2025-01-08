//Incluir import del POST de Conductor para el idConductor

export class PostLicenciaDto {
    private constructor(
        public categoria: string,
        public fechaVenc: Date,
        public numero: number,
        //Id del conductor de tipo PostConductorDto
    ){}
}