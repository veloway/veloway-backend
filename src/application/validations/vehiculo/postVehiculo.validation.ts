import { z } from 'zod';

export const PostVehiculoSchema = z.object({
  patente: z.string().length(7).optional(),
  modelo: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  nomSeguro: z.string().min(1).optional(),
  anio: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  tipoVehiculo: z.object({
    nombre: z.string().min(1).optional(),
    modelo: z.object({
      nombre: z.string().min(1).optional(),
      marca: z.string().min(1).optional()
    }).optional()
  }).optional(),
  titular: z.object({
    nombre: z.string().min(1).optional(),
    documento: z.string().min(1).optional()
  }).optional(),
  id_conductor: z.string().uuid().optional(),
  id_modelo: z.number().int().optional(),
  id_tipo_vehiculo: z.number().int().optional()
});

export const postVehiculoValidation = (vehiculo: any) => {
  return PostVehiculoSchema.safeParse(vehiculo);
};
