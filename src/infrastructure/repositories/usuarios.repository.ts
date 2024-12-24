import { type PrismaClient } from '@prisma/client';
import { Usuario } from '../../domain/entities/usuario.entity';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';

export class UsuariosRepository implements IUsuarioRepository {
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