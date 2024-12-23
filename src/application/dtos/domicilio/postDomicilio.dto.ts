import { type PostLocalidadDto } from '../localidad';

export class PostDomicilioDto {
  constructor(
    public calle: string,
    public numero: number,
    public localidad: PostLocalidadDto,
    public descripcion: string | null,
    public piso: number | null,
    public depto: string | null
  ) {}
}
