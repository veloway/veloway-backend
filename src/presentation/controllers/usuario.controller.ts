import { type Request, type Response } from 'express';
import { UsuarioService } from '../../application/services/usuario.service';
import { UsuarioDto } from '../../application/dtos/usuario/getUsuario.dto'
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { HandleError } from '../errors/handle.error';
import { clientSchema } from '../../application/validations/usuario/postUsuario.validation';


@Injectable()
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService
  ) { }

  register = async (req: Request, res: Response) => {
    try {
      const { dni, email, password, fechaNac, nombre, apellido, telefono } = req.body;

      //Hacer validacion de datos

      const validatedClient = clientSchema.parse({
        email: email,
        password: password,
        dni: dni,
        birthDate: fechaNac,
        name: nombre,
        lastName: apellido,
        phone: telefono,
      });

      // Llamar al servicio de registro
      const usuario = await this.usuarioService.register({
        dni,
        email,
        password,
        fechaNac,
        nombre,
        apellido,
        esConductor: false,
        telefono,
      });

      // Convertir la entidad de dominio en un DTO
      const usuarioDto = UsuarioDto.create(usuario);

      // Enviar respuesta al cliente
      res.status(201).json(usuarioDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  }

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


  getAll = async (req: Request, res: Response) => {
    try {
      const usuarios = await this.usuarioService.getAll();
      const usuariosDto = usuarios.map((usuario) => UsuarioDto.create(usuario));
      res.status(200).json(usuariosDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  }

  getUsuarioPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Obtener el usuario desde el servicio
      const usuario = await this.usuarioService.getUsuarioPorId(id);

      // Convertir a DTO
      const usuarioDto = UsuarioDto.create(usuario);

      // Responder al cliente
      res.status(200).json(usuarioDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  }

  getUsuarioPorEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      // Obtener el usuario desde el servicio
      const usuario = await this.usuarioService.getUsuarioPorEmail(email);

      // Convertir a DTO
      const usuarioDto = UsuarioDto.create(usuario);

      // Responder al cliente
      res.status(200).json(usuarioDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  }

}
