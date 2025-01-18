import { type Request, type Response } from 'express';
import { UsuarioService } from '../../application/services/usuario.service';
import { GetUsuarioDto } from '../../application/dtos/usuario/getUsuario.dto';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { HandleError } from '../errors/handle.error';
import { RegisterUsuarioDto } from '../../application/dtos/usuario/registerUsuario.dto';

@Injectable()
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const [error, clienteDto] = RegisterUsuarioDto.create(req.body);

      if (error) {
        res.status(400).json({ message: error });
        return;
      }

      if (clienteDto) {
        const usuario = await this.usuarioService.register(clienteDto);
        const usuarioDto = GetUsuarioDto.create(usuario);
        res.status(201).json(usuarioDto);
      }
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  // login = async (req: Request, res: Response) => {
  //   try {
  //     const { email, password } = req.body;

  //     // Verificar las credenciales
  //     const loginResponse = await this.usuarioService.login(email, password);

  //     if (!loginResponse) {
  //       return res.status(401).json({ message: 'Credenciales inválidas' });
  //     }

  //     const { token, usuario } = loginResponse;


  //     res.cookie('auth_token', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'strict',
  //       maxAge:  60 * 60 * 1000, // 1 hs
  //     });
  //     // Enviar respuesta con el token
  //     res.status(200).json({ message: 'Login exitoso', usuario });
  //   } catch (error) {
  //     return HandleError.throw(error, res);
  //   }
  // };

  // logout = (req: Request, res: Response): void=> {
  //   try {
  //     res.clearCookie('auth_token', {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'strict',
  //       path: '/'
  //     });

  //      res.status(200).json({ message: 'Logout exitoso' });
  //   } catch (error) {
  //      res.status(500).json({ message: 'Hubo un error al cerrar sesión' });
  //   }
  // };


  // requestPasswordReset = async (req: Request, res: Response) => {
  //   try {
  //     const { email } = req.body;
  //     await this.usuarioService.requestPasswordReset(email);
  //     res.status(200).json({ message: 'Correo de recuperación enviado.' });
  //   } catch (error) {
  //     HandleError.throw(error, res);
  //   }
  // };

  //  resetPassword = async (req: Request, res: Response) => {
  //   try {
  //     const { token, newPassword } = req.body;
  //     await this.usuarioService.resetPassword(token, newPassword);
  //     res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
  //   } catch (error) {
  //     HandleError.throw(error, res);
  //   }
  // };


  getAll = async (_req: Request, res: Response) => {
    try {
      const usuarios = await this.usuarioService.getAll();
      const usuariosDto = usuarios.map((usuario) => GetUsuarioDto.create(usuario));

      res.status(200).json(usuariosDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  getUsuarioPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioService.getUsuarioPorId(id);
      const usuarioDto = GetUsuarioDto.create(usuario);

      res.status(200).json(usuarioDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  getUsuarioPorEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const usuario = await this.usuarioService.getUsuarioPorEmail(email);
      const usuarioDto = GetUsuarioDto.create(usuario);

      res.status(200).json(usuarioDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}
