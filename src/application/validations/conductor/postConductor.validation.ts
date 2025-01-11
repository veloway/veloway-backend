import { z } from 'zod';
import { type Conductor } from '../../../domain/entities/conductor.entity';

export const PostConductorSchema = z.object({
  compartirFichaMedica: z.boolean()
  /* foreign que necesito
    dni: PostUsuariosSchema,
    idEstado: PostEstaado_conductoresSchema,
    numeroLicencia: PostLicenciasSchema,
    idFichaMedica: PostFichas_medicasSchema,
    patente: PostVehiculosSchema,
*/
});

export const postConductorValidation = (conductor: Conductor) => {
  return PostConductorSchema.safeParse(conductor);
};