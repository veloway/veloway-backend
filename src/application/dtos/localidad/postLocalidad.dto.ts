import { type PostProvinciaDto } from '../provincia/postProvincia.dto';

export class PostLocalidadDto {
  constructor(
    public codigoPostal: number,
    public nombre: string,
    public provincia: PostProvinciaDto
  ) {}
}