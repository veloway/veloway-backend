import { clientValidation } from '../../validations/usuario/postUsuario.validation';

export class RegisterUsuarioDto {
  private constructor(
    public dni: number,
    public email: string,
    public password: string,
    public fechaNac: Date,
    public nombre: string,
    public apellido: string,
    public esConductor: boolean,
    public telefono?: string | null,
    public idDomicilio?: number | null
  ) {}

  public static create(usuario: any): [string?, RegisterUsuarioDto?] {
    const clienteValidation = clientValidation(usuario);

    if (clienteValidation.error) {
      return [JSON.parse(clienteValidation.error.message)];
    }

    const fechaNacDate = new Date(clienteValidation.data.birthDate);

    return [undefined, new RegisterUsuarioDto(
      clienteValidation.data.dni,
      clienteValidation.data.email,
      clienteValidation.data.password,
      fechaNacDate,
      clienteValidation.data.name,
      clienteValidation.data.lastName,
      false,
      clienteValidation.data.phone
    )];
  }


  public setIdDomicilio(idDom: number) {
    this.idDomicilio = idDom
  }
}