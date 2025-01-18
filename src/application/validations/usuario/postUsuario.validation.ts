import { z } from "zod";

// Validación para correo electrónico
const emailSchema = z.string().email("El correo electrónico no es válido");

// Validación para contraseña
const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
//   .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
//   .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
//   .regex(/[0-9]/, "La contraseña debe tener al menos un número")
//   .regex(/[\W_]/, "La contraseña debe tener al menos un carácter especial");

// Validación para DNI (ejemplo: debe ser un número de 7 u 8 dígitos en algunos países)
const dniSchema = z
.number()
.int() // Asegura que sea un número entero
.positive() // Asegura que sea un número positivo
.gte(10000000, "El DNI debe tener al menos 8 dígitos") // Mayor o igual a 10000000
.lte(99999999, "El DNI no puede tener más de 8 dígitos");

// Validación para fecha de nacimiento (ejemplo: debe ser una fecha válida y el usuario debe ser mayor de 18 años)
const birthDateSchema = z
  .string()
  .refine((date) => {
    const parsedDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - parsedDate.getFullYear();
    return age >= 18;
  }, "Debes tener al menos 18 años para registrarte");

// Validación para nombre y apellido
const nameSchema = z
  .string()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no puede exceder los 50 caracteres")
  .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s'-]+$/, "El nombre solo puede contener letras y espacios");

// Validación para teléfono (ejemplo: formato internacional o nacional)
const phoneSchema = z
  .string()
  .min(10, "El número de teléfono debe tener al menos 10 dígitos")
  .max(15, "El número de teléfono no puede exceder los 15 dígitos")
  .regex(/^\+?\d+$/, "El número de teléfono debe ser válido");

// Validación para el número de registro (campo del conductor)
const registerNumberSchema = z
  .string()
  .min(5, "El número de registro debe tener al menos 5 caracteres");

// Validación para la categoría de licencia
const licenseCategorySchema = z.enum(["A", "B", "C", "D", "E"], {
  errorMap: () => ({
    message: "La categoría de licencia debe ser A, B, C, D o E",
  }),
});

// Validación para la fecha de vencimiento de la licencia
const licenseExpirationSchema = z
  .string()
  .refine((date) => {
    const parsedDate = new Date(date);
    return parsedDate > new Date();
  }, "La licencia no puede estar vencida");


 export const clientSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    dni: dniSchema,
    birthDate: birthDateSchema,
    name: nameSchema,
    lastName: nameSchema,
    phone: phoneSchema,
  });
  

  export const driverSchema = clientSchema.extend({
    registerNumber: registerNumberSchema,
    licenseCategory: licenseCategorySchema,
    licenseExpiration: licenseExpirationSchema,
    shareMedicalRecord: z.boolean(),
  });
  