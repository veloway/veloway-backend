import { type Usuario } from '../entities/usuario.entity';

export interface IUsuarioRepository {
  getall: () => Promise<Usuario[]>
  getUsuario: (id: string) => Promise<Usuario | null>
}