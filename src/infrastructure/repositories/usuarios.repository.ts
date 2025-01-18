import { PrismaClient } from '@prisma/client';
import { Usuario } from '../../domain/entities/usuario.entity';
import { Injectable } from '../dependencies/injectable.dependency';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) { }

  // Método para obtener todos los usuarios
  public async getall(): Promise<Usuario[]> {
    const usuariosData = await this.prisma.usuarios.findMany();

    // Mapeamos los resultados de la base de datos a la entidad Usuario
    return usuariosData.map((usuarioData) => {
      return new Usuario(
        usuarioData.id_usuario,
        usuarioData.dni,
        usuarioData.email,
        usuarioData.password,
        usuarioData.fecha_nac,
        usuarioData.nombre,
        usuarioData.apellido,
        usuarioData.es_conductor,
        usuarioData.is_active,
        usuarioData.api_key,
        usuarioData.telefono
      );
    });
  }

  public async getUsuario(id: string): Promise<Usuario | null> {
    const usuarioData = await this.prisma.usuarios.findUnique({
      where: {
        id_usuario: id
      }
    });

    // Si encontramos al usuario, lo convertimos en una instancia de Usuario
    if (usuarioData) {
      return new Usuario(
        usuarioData.id_usuario,
        usuarioData.dni,
        usuarioData.email,
        usuarioData.password,
        usuarioData.fecha_nac,
        usuarioData.nombre,
        usuarioData.apellido,
        usuarioData.es_conductor,
        usuarioData.is_active,
        usuarioData.api_key,
        usuarioData.telefono
      );
    }

    // Si no existe, retornamos null
    return null;
  }

  public async getUsuarioByEmail(email: string): Promise<Usuario | null> {
    const usuarioData = await this.prisma.usuarios.findUnique({
      where: {
        email
      }
    });

    if (usuarioData) {
      return new Usuario(
        usuarioData.id_usuario,
        usuarioData.dni,
        usuarioData.email,
        usuarioData.password,
        usuarioData.fecha_nac,
        usuarioData.nombre,
        usuarioData.apellido,
        usuarioData.es_conductor,
        usuarioData.is_active,
        usuarioData.api_key,
        usuarioData.telefono
      );
    }
    return null;
  }

  public async create(usuario: Usuario): Promise<void> {
    await this.prisma.usuarios.create({
      data: {
        id_usuario: usuario.getID(),
        dni: usuario.getDni(),
        email: usuario.getEmail(),
        password: usuario.getPassword(),
        fecha_nac: usuario.getFechaNac(),
        nombre: usuario.getNombre(),
        apellido: usuario.getApellido(),
        es_conductor: usuario.getEsConductor(),
        is_active: usuario.getIsActive(),
        api_key: usuario.getApiKey(),
        telefono: usuario.getTelefono()
      }
    });
  }

  public async update(usuario: Usuario): Promise<void> {
    try {
      // Prisma realiza una actualización de usuario, usando el ID para buscarlo
      await this.prisma.usuarios.update({
        where: { id_usuario: usuario.getID() }, // Buscamos por ID para actualizar el usuario
        data: {
          dni: usuario.getDni(),
          email: usuario.getEmail(),
          password: usuario.getPassword(),
          fecha_nac: usuario.getFechaNac(),
          nombre: usuario.getNombre(),
          apellido: usuario.getApellido(),
          es_conductor: usuario.getEsConductor(),
          telefono: usuario.getTelefono()
        }
      });
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      throw new Error('No se pudo guardar al usuario');
    }
  }

  public async resetPassword(newPassword: string, usuario: Usuario): Promise<void> {
    try {
      usuario.setPassword(newPassword);
      await this.update(usuario);
    } catch (error) {
      console.error('Error al resetear contraseña del usuario:', error);
      throw new Error('No se pudo guardar la contraseña');
    }
  }
}

