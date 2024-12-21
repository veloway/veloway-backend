import { z } from 'zod';
import { type GetEnvioDto } from '../../application';

const envioSchema = z.object({
  nroSeguimiento: z.number().int(),
  descripcion: z.string(),
  fecha: z.date(),
  hora: z.date(),
  pesoGramos: z.number().int(),
  monto: z.number().int(),
  estado: z.string(),
  origen: z.object({
    calle: z.string(),
    altura: z.number().int(),
    localidad: z.string(),
    provincia: z.string(),
    codigo_postal: z.string()
  }),
  destino: z.object({
    calle: z.string(),
    altura: z.number().int(),
    localidad: z.string(),
    provincia: z.string(),
    codigo_postal: z.string()
  }),
  cliente: z.object({
    nombre: z.string(),
    apellido: z.string(),
    dni: z.string(),
    telefono: z.string(),
    email: z.string().email()
  })
});

const envioValidation = (envio: GetEnvioDto) => {
  return envioSchema.safeParse(envio);
};

export { envioValidation };