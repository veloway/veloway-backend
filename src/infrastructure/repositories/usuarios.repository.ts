import { PrismaClient } from '@prisma/client';
import { Usuario } from '../../domain/entities/usuario.entity';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';
import { Injectable } from '../dependencies/injectable.dependency';

@Injectable()
export class UsuariosRepository implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

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