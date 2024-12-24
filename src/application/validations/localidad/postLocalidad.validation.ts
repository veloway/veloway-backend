import { z } from 'zod';
import { PostProvinciaSchema } from '../provincia/postProvincia.validation';

export const LocalidadSchema = z.object({
  codigoPostal: z.number().int(),
  nombre: z.string(),
  provincia: PostProvinciaSchema
});

export const postLocalidadValidation = (localidad: any) => {
  return LocalidadSchema.safeParse(localidad);
};