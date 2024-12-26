import { type Usuario } from '../../../domain/entities/usuario.entity';

export class UsuarioDto {
  private constructor(
    private dni: number,
    private email: string,
    private nombre: string,
    private apellido: string,
    private telefono?: string | null
  ) {}

  public static create(usuario: Usuario): UsuarioDto {
    return new UsuarioDto(
      usuario.getDni(),
      usuario.getEmail(),
      usuario.getNombre(),
      usuario.getApellido(),
      usuario.getTelefono()
    );
  }
}