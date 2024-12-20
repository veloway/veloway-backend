import { Expose } from 'class-transformer';

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
    id_estado: number;
}

