export class PostLicenciaDto {
    private constructor(
        public categoria: string,
        public fechaVenc: Date,
        public numero: number,
        public idConductor: string
    ){}
}