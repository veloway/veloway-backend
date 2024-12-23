import { z } from 'zod';

export const ProvinciaSchema = z.object({
  nombre: z.string()
});

export const postProvinciaValidation = (provincia: any) => {
  return ProvinciaSchema.safeParse(provincia);
};