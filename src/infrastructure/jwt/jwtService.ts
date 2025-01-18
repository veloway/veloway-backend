import { Injectable } from '../dependencies/injectable.dependency';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = 'secretkey';
  private readonly expiresIn = '1h';

  public generateToken(usuario: any): string {
    const payload = {
      id: usuario.id_usuario,
      email: usuario.email
    };

    // Generamos el token JWT
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey); // Verificamos si el token es válido
    } catch (error) {
      return null; // Si el token no es válido o ha expirado, devolvemos null
    }
  }
}
