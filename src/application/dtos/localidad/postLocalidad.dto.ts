import { type PostProvinciaDto } from '../provincia';

export class PostLocalidadDto {
  constructor(
    public codigoPostal: number,
    public nombre: string,
    public provincia: PostProvinciaDto
  ) {}
}