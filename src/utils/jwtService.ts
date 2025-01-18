import { Injectable } from '../infrastructure/dependencies/injectable.dependency';
import jwt from 'jsonwebtoken'; // Librería para manejar JWT

@Injectable()
export class JwtService {
  private readonly secretKey = 'secretkey'; 
  private readonly expiresIn = '1h';  // El token expirará en 1 hora

  public generateToken(usuario: any): string {
    // Creamos el payload, que normalmente es el id del usuario y/o email
    const payload = {
      id: usuario.id_usuario,
      email: usuario.email,
    };

    // Generamos el token JWT
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);  // Verificamos si el token es válido
    } catch (error) {
      return null;  // Si el token no es válido o ha expirado, devolvemos null
    }
  }
}
