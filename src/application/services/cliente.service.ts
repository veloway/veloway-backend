import { type Usuario } from '../../domain/entities/usuario.entity';
import { type IUsuarioRepository } from '../../domain/repositories/usuario.interface';
import { CustomError } from '../errors/custom.errors';

export class ClienteService {
  constructor(private readonly usuariosRepository: IUsuarioRepository) {}

  public async getCliente(idCliente: string): Promise<Usuario> {
    const cliente = await this.usuariosRepository.getUsuario(idCliente);
    if (!cliente) throw CustomError.notFound('El cliente no existe');

    if (cliente.getEsConductor()) throw CustomError.notFound('El cliente no existe');
    return cliente;
  }
}