import { z } from 'zod';
import { DomicilioSchema } from '../domicilio';

export const EnvioSchema = z.object({
  descripcion: z.string(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD'),
  hora: z.string().regex(/^\d{2}:\d{2}$/, 'Hora en formato HH:mm'),
  pesoGramos: z.number().int().positive(),
  monto: z.number().positive(),
  origen: DomicilioSchema,
  destino: DomicilioSchema,
  cliente: z.string()
});

export const postEnvioValidation = (envio: any) => {
  return EnvioSchema.safeParse(envio);
};
