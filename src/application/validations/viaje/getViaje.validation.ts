import { z } from 'zod';
import { PostEnvioSchema } from '../envio/postEnvio.validation';
import { PostConductorSchema } from '../conductor/postConductor.validation';

export const GetViajeSchema = z.object({
  checkpointActual: z.number().int().positive(),
  fechaFin: z.string().regex(/^\d{2}:\d{2}$/),
  fechaInicio: z.string().regex(/^\d{2}:\d{2}$/),
  numero: z.number().int().positive(),
  nroSeguimiento: PostEnvioSchema,
  conductor: PostConductorSchema,
  origenCord: PostEnvioSchema,
  destinoCord: PostEnvioSchema
});

export const getViajeValidation = (viaje: any) => {
  return GetViajeSchema.safeParse(viaje);
};




