import { type Usuario } from '../entities/usuario.entity';

export interface IUsuarioRepository {
  getall: () => Promise<Usuario[]>
  getUsuario: (id: string) => Promise<Usuario | null>
  getUsuarioByEmail: (email: string) => Promise <Usuario | null>
  create: (usuario: Usuario) => Promise <void>
  deactivateUser: (id: string) => Promise<void>
  updateApiKey: (id: string, hashedApiKey: string) => Promise<void>
  findUserByApiKey: (apiKey: string) => Promise<Usuario | null>
  update:(usuario: Usuario) => Promise<void>
}