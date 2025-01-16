import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../utils/jwtService';  // Importa el JwtService

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  const jwtService = new JwtService();
  const payload = jwtService.verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
  
  next();
}
