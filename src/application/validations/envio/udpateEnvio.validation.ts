import { z } from 'zod';
import { PostDomicilioSchema } from '../domicilio/postDomicilio.validation';


// TODO: HACER QUE LOS CAMPOS SEAN OPCIONALES
export const UpdateEnvioSchema = z.object({
  nroSeguimiento: z.number().int().positive(),
  descripcion: z.string(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD'),
  hora: z.string().regex(/^\d{2}:\d{2}$/, 'Hora en formato HH:mm'),
  pesoGramos: z.number().int().positive(),
  monto: z.number().positive(),
  estadoID: z.number().int().positive(),
  origen: PostDomicilioSchema,
  destino: PostDomicilioSchema,
  clienteID: z.string()
});

export const updateEnvioValidation = (envio: any) => {
  return UpdateEnvioSchema.safeParse(envio);
};