import { z } from "zod";
// Importar post de conductor

export const PostLicenciaSchema = z.object({
    categoria: z.string(),
    fechaVenc: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD'),
    numero: z.number(),
    // Validar id conductor
})

export const postLicenciaValidation = (licencia: any) => {
    return PostLicenciaSchema.safeParse(licencia);
}