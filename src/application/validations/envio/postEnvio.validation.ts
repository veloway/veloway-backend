import { z } from 'zod';
import { DomicilioSchema } from '../domicilio';

export const EnvioSchema = z.object({
  descripcion: z.string(),
  fecha: z.string(), // TODO: CAMBIAR STRING A FECHA
  hora: z.string(),
  pesoGramos: z.number().int().positive(),
  monto: z.number().positive(),
  origen: DomicilioSchema,
  destino: DomicilioSchema,
  cliente: z.string()
});

export const postEnvioValidation = (envio: any) => {
  return EnvioSchema.safeParse(envio);
};
