import { type PrismaClient } from '@prisma/client';
import { type UsuarioI } from '../../domain/interfaces/usuario.interface';
import { Usuario } from '../../domain/entities/usuario.entity';

export class UsuariosRepository implements UsuarioI {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getall: () => Promise<Usuario[]>;

  public async getUsuario(id: string): Promise<Usuario | null> {
    const usuarioData = await this.prisma.usuarios.findUnique({
      where: {
        id_usuario: id
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
        usuarioData.telefono
      );
    }

    return null;
  }
}