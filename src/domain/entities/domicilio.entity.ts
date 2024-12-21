import { type Usuario } from './usuario.entity';

type Localidad = 'localidad.entity'; // TODO: Implementar la entidad Localidad

export class Domicilio {
  constructor(
    private id_domicilio: number,
    private calle: string,
    private numero: number,
    private id_localidad: number,
    private id_usuario: string | null,
    private piso?: number | null,
    private depto?: string | null,
    private descripcion?: string | null,

    private localidades?: Localidad,
    private usuarios?: Usuario | null
  ) {
    this.id_domicilio = id_domicilio;
    this.calle = calle;
    this.numero = numero;
    this.piso = piso;
    this.depto = depto;
    this.descripcion = descripcion;
    this.id_localidad = id_localidad;
    this.id_usuario = id_usuario;
  }

  // Getters
  public getIdDomicilio(): number {
    return this.id_domicilio;
  }
}