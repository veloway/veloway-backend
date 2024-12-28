export class UpdateDomicilioDto {
  private constructor(
    public calle?: string,
    public numero?: number,
    public descripcion?: string | null,
    public piso?: number | null,
    public depto?: string | null,
    public localidadID?: number
  ) {}
}
