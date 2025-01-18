import { type Request, type Response } from 'express';
import { AuthService } from '../../application/services/auth.service';
import { HandleError } from '../errors/handle.error';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';



@Injectable()
export class AuthController {

    constructor(
      private readonly authService: AuthService
    ) { }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Verificar las credenciales
      const loginResponse = await this.authService.login(email, password);

      if (!loginResponse) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const { token, usuario } = loginResponse;


      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:  60 * 60 * 1000, // 1 hs
      });
      // Enviar respuesta con el token
      res.status(200).json({ message: 'Login exitoso', usuario });
    } catch (error) {
      return HandleError.throw(error, res);
    }
  };

  logout = (req: Request, res: Response): void=> {
    try {
      res.clearCookie('auth_token', {
        httpOnly: true,  
        secure: process.env.NODE_ENV === 'production',  
        sameSite: 'strict', 
        path: '/'  
      });

       res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
       res.status(500).json({ message: 'Hubo un error al cerrar sesión' });
    }
  };


  requestPasswordReset = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.authService.requestPasswordReset(email);
      res.status(200).json({ message: 'Correo de recuperación enviado.' });
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

   resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
      await this.authService.resetPassword(token, newPassword);
      res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}