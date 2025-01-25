import { z } from 'zod';
import { type Conductor } from '../../../domain/entities/conductor.entity';
import { type EstadoConductor } from '../../../domain/entities/estadoConductor.entity';
import { clientSchema } from '../usuario/postUsuario.validation';

// Validación para el número de registro (campo del conductor)
const registerNumberSchema = z
  .string()
  .min(5, 'El número de registro debe tener al menos 5 caracteres');

// Validación para la categoría de licencia
const licenseCategorySchema = z.enum(['A', 'B', 'C', 'D', 'E'], {
  errorMap: () => ({
    message: 'La categoría de licencia debe ser A, B, C, D o E'
  })
});

const licenseExpirationSchema = z
  .string()
  .refine((date) => {
    const parsedDate = new Date(date);
    return parsedDate > new Date();
  }, 'La licencia no puede estar vencida');


export const driverSchema = clientSchema.extend({
  registerNumber: registerNumberSchema,
  licenseCategory: licenseCategorySchema,
  licenseExpiration: licenseExpirationSchema,
  shareMedicalRecord: z.boolean()
});


export const postConductorValidation = (conductor: Conductor) => {
  return driverSchema.safeParse(conductor);
};