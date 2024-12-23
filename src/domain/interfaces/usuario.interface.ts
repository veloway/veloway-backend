import { type Usuario } from '../entities';

export interface UsuarioI {
  getall: () => Promise<Usuario[]>
  getUsuario: (id: string) => Promise<Usuario | null>
  create: (usuario: Usuario) => Promise<void>
}