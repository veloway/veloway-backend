import { JwtService } from '../../infrastructure/jwt/jwtService';
import { type Request, type Response, type NextFunction } from 'express';

// Interfaz para el payload del JWT

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.auth_token; // hacer que agarre el token desde la cookie
  const jwtService = new JwtService();

  if (!token) {
    res.status(401).json({ message: 'No estás autenticado. Token no proporcionado.' });
    return;
  }

  try {
    const decoded = jwtService.verifyToken(token);
    req.user = decoded; // Establecemos el usuario decodificado en la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
