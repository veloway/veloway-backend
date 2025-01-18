import { type Usuario } from '../../../domain/entities/usuario.entity';

export class GetUsuarioDto {
  private constructor(
    private dni: number,
    private email: string,
    private nombre: string,
    private apellido: string,
    private telefono?: string | null
  ) {}

  public static create(usuario: Usuario): GetUsuarioDto {
    return new GetUsuarioDto(
      usuario.getDni(),
      usuario.getEmail(),
      usuario.getNombre(),
      usuario.getApellido(),
      usuario.getTelefono()
    );
  }
}