import { type Localidad } from '../../../domain';

export class PostDomicilioDto {
  constructor(
    public descripcion: string | null,
    public calle: string,
    public numero: number,
    public localidad: Localidad,
    public piso?: string,
    public depto?: string
  ) {}
}
