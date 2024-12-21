import { Expose } from 'class-transformer';
import { Domicilio, Usuario } from '../../../domain';

export class EnvioDto {
  @Expose()
    nro_seguimiento: string;

  @Expose()
    descripcion: string;

  @Expose()
    fecha: Date;

  @Expose()
    hora: Date;

  @Expose()
    peso_gramos: number;

  @Expose()
    estado: string;

  @Expose()
    origen: Domicilio;

  @Expose()
    destino: Domicilio;

  @Expose()
    cliente: Usuario;
}

