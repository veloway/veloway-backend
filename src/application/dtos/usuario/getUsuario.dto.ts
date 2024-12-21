import { type Usuario } from '../../../domain';

export class UsuarioDto {
  constructor(
    private dni: number,
    private email: string,
    private fechaNac: Date,
    private nombre: string,
    private apellido: string,
    private esConductor: boolean,
    private telefono?: string
  ) {}

  public static create(usuario: Usuario): UsuarioDto {
    return new UsuarioDto(
      usuario.getDni(),
      usuario.getEmail(),
      usuario.getFechaNac(),
      usuario.getNombre(),
      usuario.getApellido(),
      usuario.getEsConductor(),
      usuario.getTelefono()
    );
  }
}