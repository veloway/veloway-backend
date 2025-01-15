import { type Request, type Response } from 'express';
import { UsuarioService } from '../../application/services/usuario.service';
import { UsuarioDto } from '../../application/dtos/usuario/getUsuario.dto'
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { HandleError } from '../errors/handle.error';


@Injectable()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  register = async (req: Request, res: Response) => {
    try {
      const { dni, email, password, fechaNac, nombre, apellido, esConductor, telefono } = req.body;


      // Llamar al servicio de registro
      const usuario = await this.usuarioService.execute({
        dni,
        email,
        password,
        fechaNac,
        nombre,
        apellido,
        esConductor,
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
