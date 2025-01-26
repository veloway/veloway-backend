import { updateLicenciaValidation } from "../../validations/licencia/updateLicencia.validation";

export class UpdateLicenciaDto {
    private constructor(
        public categoria: string,
        public fechaVenc: Date,
        public numero: number
    ){}

    public static create(categoria: string, fechaVenc: Date, numero: number): UpdateLicenciaDto {
        const licenciaValidation = updateLicenciaValidation({categoria, fechaVenc, numero});

        if (!licenciaValidation.success) {
            throw new Error(licenciaValidation.error.message);
        }

        const fechaVencDate = new Date(fechaVenc);
        
        return new UpdateLicenciaDto(
            licenciaValidation.data.categoria,
            fechaVencDate,
            licenciaValidation.data.numero
        );
    }
}

