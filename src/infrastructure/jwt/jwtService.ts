import { type Usuario } from '../../domain/entities/usuario.entity';
import { Injectable } from '../dependencies/injectable.dependency';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = 'secretkey';
  private readonly expiresIn = '1h';

  public generateToken(usuario: Usuario): string {
    // Crea un objeto payload con los datos relevantes del usuario
    const payload = {
      id: usuario.getID(), // Incluye el ID del usuario
      nombre: usuario.getNombre(), // Incluye el nombre del usuario
      email: usuario.getEmail(), // Incluye el email del usuario
      esConductor: usuario.getEsConductor(), // Incluye el rol del usuario
      domicilio: usuario.getDomicilio()
    };
    // Generamos el token JWT con el payload estructurado
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);// Verificamos si el token es válido
    } catch (error) {
      return null; // Si el token no es válido o ha expirado, devolvemos null
    }
  }
}
