import { type Usuario } from '../entities/usuario.entity';

export interface UsuarioI {
  getall: () => Promise<Usuario[]>
  getUsuario: (id: string) => Promise<Usuario | null>
}