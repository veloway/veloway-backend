import { type PrismaClient } from '@prisma/client';
import { Usuario, type UsuarioI } from '../../domain';

export class UsuariosRepository implements UsuarioI {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getall: () => Promise<Usuario[]>;
  create: (usuario: Usuario) => Promise<void>;

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