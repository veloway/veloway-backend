import { z } from 'zod';
import { LocalidadSchema } from '../localidad/postLocalidad.validation';

export const DomicilioSchema = z.object({
  calle: z.string(),
  numero: z.number().int(),
  piso: z.number().int().nullable(),
  depto: z.string().nullable(),
  descripcion: z.string().nullable(),
  localidad: LocalidadSchema
});

export const postDomicilioValidation = (domicilio: any) => {
  return DomicilioSchema.safeParse(domicilio);
};