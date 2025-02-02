import { UsuarioRepository } from '../../infrastructure/repositories/usuarios.repository';
import { type Usuario } from '../../domain/entities/usuario.entity';
import { BcryptHashProvider } from '../../infrastructure/jwt/bcrypt-hash.provider';
import { Injectable, Inject } from '../../infrastructure/dependencies/injectable.dependency';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { JwtService } from '../../infrastructure/jwt/jwtService';
import { EmailService } from '../../infrastructure/email/nodeMailerService';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  resetTokens: Map<string, string>;
  constructor(
    @Inject(REPOSITORIES_TOKENS.IUsuariosRepository) private readonly usuarioRepository: UsuarioRepository,
    private readonly hashProvider: BcryptHashProvider,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) {
    this.resetTokens = new Map<string, string>();
  }


  public async login(email: string, password: string): Promise<{ token: string, usuario: Usuario } | null> {
    const usuario = await this.usuarioRepository.getUsuarioByEmail(email);

    if (!usuario) {
      return null;
    }
    if (!usuario.getIsActive()) {
      return null;
    }
    // Comparar la contraseña con la almacenada (suponiendo que la contraseña está cifrada)
    const validPassword = await this.hashProvider.compare(password, usuario.getPassword());

    if (!validPassword) {
      return null;
    }
    const token = this.jwtService.generateToken(usuario);

    return { token, usuario };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const usuario = await this.usuarioRepository.getUsuarioByEmail(email);

    if (!usuario) {
      throw new Error('El correo no está registrado.');
    }

    // Generar un token único
    const token = crypto.randomBytes(32).toString('hex');
    this.resetTokens.set(token, email);

    // Enviar el correo con el enlace
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.emailService.sendEmail({
      to: email,
      subject: 'Recuperación de Contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetLink}">${resetLink}</a>`
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const email = this.resetTokens.get(token);
    if (!email) {
      throw new Error('Token inválido o expirado.');
    }

    const usuario = await this.usuarioRepository.getUsuarioByEmail(email);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }

    const newHashedPassword = await this.hashProvider.hash(newPassword);

    this.usuarioRepository.resetPassword(newHashedPassword, usuario);

    // Eliminar el token después de usarlo
    this.resetTokens.delete(token);
  }
}
