import { z } from 'zod';

export const UpdateDomicilioSchema = z.object({
  calle: z.string().optional(),
  numero: z.number().int().optional(),
  piso: z.number().int().nullable().optional(),
  depto: z.string().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  localidadID: z.number().int().optional()
});

export const postDomicilioValidation = (domicilio: any) => {
  return UpdateDomicilioSchema.partial().safeParse(domicilio);
};