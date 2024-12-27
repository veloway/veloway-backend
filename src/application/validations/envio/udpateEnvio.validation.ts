import { z } from 'zod';
import { PostDomicilioSchema } from '../domicilio/postDomicilio.validation';


export const UpdateEnvioSchema = z.object({
  descripcion: z.string(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD'),
  hora: z.string().regex(/^\d{2}:\d{2}$/, 'Hora en formato HH:mm'),
  pesoGramos: z.number().int().positive(),
  monto: z.number().positive(),
  estadoID: z.number().int().positive(),
  origen: PostDomicilioSchema,
  destino: PostDomicilioSchema
});

export const updateEnvioValidation = (envio: any) => {
  return UpdateEnvioSchema.partial().safeParse(envio);
};