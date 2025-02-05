import 'express';
import { type Domicilio } from '../../domain/entities/domicilio.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string // Incluye el ID del usuario
        nombre: string // Incluye el nombre del usuario
        email: string // Incluye el email del usuario
        rol: boolean
        domicilio: Domicilio
        apellido: string
        telefono: string
        activo: boolean
      }
      apikey?: string
    }
  }
}