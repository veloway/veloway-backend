import { z } from 'zod';
import { ProvinciaSchema } from '../provincia';

export const LocalidadSchema = z.object({
  codigoPostal: z.number().int(),
  nombre: z.string(),
  provincia: ProvinciaSchema
});

export const postLocalidadValidation = (localidad: any) => {
  return LocalidadSchema.safeParse(localidad);
};