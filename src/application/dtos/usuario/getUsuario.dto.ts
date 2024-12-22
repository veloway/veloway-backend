import { type Usuario } from '../../../domain';

export class UsuarioDto {
  constructor(
    private dni: number,
    private email: string,
    private nombre: string,
    private apellido: string,
    private telefono?: string
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