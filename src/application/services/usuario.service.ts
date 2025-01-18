import { UsuarioRepository } from '../../infrastructure/repositories/usuarios.repository';
import { Usuario } from '../../domain/entities/usuario.entity';
import { BcryptHashProvider  } from '../../utils/bcrypt-hash.provider';
import { Injectable, Inject} from '../../infrastructure/dependencies/injectable.dependency';
import { randomUUID } from 'crypto';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { JwtService } from '../../utils/jwtService';


interface RegisterUsuarioDto {
  dni: number;
  email: string;
  password: string;
  fechaNac: Date;
  nombre: string;
  apellido: string;
  esConductor: boolean;
  telefono?: string | null;
}

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(REPOSITORIES_TOKENS.IUsuariosRepository)
    private readonly usuarioRepository: UsuarioRepository,
    @Inject(BcryptHashProvider) private readonly hashProvider: BcryptHashProvider,
    private readonly jwtService: JwtService
  ) {}


  public async login(email: string, password: string): Promise<{ token: string; usuario: Usuario } | null> {
    // Buscar al usuario por email
    const usuario = await this.usuarioRepository.getUsuarioByEmail(email);

    // Si no se encuentra el usuario
    if (!usuario) {
      return null;
    }

    // Comparar la contraseña con la almacenada (suponiendo que la contraseña está cifrada)
    const validPassword = await this.hashProvider.compare(password, usuario.getPassword());

    if (!validPassword) {
      return null; // Si la contraseña no coincide, retornamos null
    }
    const token = await this.jwtService.generateToken({ usuario: Usuario });

    return { token, usuario }; // Si la autenticación es exitosa, retornamos el usuario
  }


  public async execute(data: RegisterUsuarioDto): Promise<Usuario> {
    const { dni, email, password, fechaNac, nombre, apellido, esConductor, telefono } = data;

    
    const id = randomUUID(); // Generar UUID en el servicio

    // Validar si ya existe un usuario con el mismo email
    const usuarioExistente = await this.usuarioRepository.getUsuarioByEmail(email);
    if (usuarioExistente) {
      throw new Error('El correo ya está registrado.');
    }

    // Encriptar la contraseña
    const hashedPassword = await this.hashProvider.hash(password);

    const fechaNacDate = new Date(fechaNac)

    // Crear la entidad de usuario
    const usuario = new Usuario(
      id,
      dni,
      email,
      hashedPassword,
      fechaNacDate,
      nombre,
      apellido,
      esConductor,
      telefono
    );

    // Guardar el usuario en la base de datos
    await this.usuarioRepository.create(usuario);

    return usuario;
  }

  public async getAll(): Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.getall();
    return usuarios
  }


  public async getUsuarioPorId(id: string): Promise<any | null> {
    const usuario = await this.usuarioRepository.getUsuario(id);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return usuario;
  }

  public async getUsuarioPorEmail(email: string): Promise<any | null> {
    const usuario = await this.usuarioRepository.getUsuarioByEmail(email);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return usuario;
  }

}
