import { type Domicilio } from './domicilio.entity';
import { type Usuario } from './usuario.entity';

export class Envio {
  constructor(
    private nro_seguimiento: string,
    private descripcion: string,
    private fecha: Date,
    private hora: Date,
    private peso_gramos: number,
    // TODO: private monto: number,
    private estado: string,
    private origen: Domicilio,
    private destino: Domicilio,
    private cliente: Usuario
  ) {
    this.nro_seguimiento = nro_seguimiento;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.hora = hora;
    this.peso_gramos = peso_gramos;
  }

  // Getters
  public getNroSeguimiento(): string {
    return this.nro_seguimiento;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public getFecha(): Date {
    return this.fecha;
  }

  public getHora(): Date {
    return this.hora;
  }

  public getPesoGramos(): number {
    return this.peso_gramos;
  }

  public getEstado(): string {
    return this.estado;
  }

  public getOrigen(): Domicilio {
    return this.origen;
  }

  public getDestino(): Domicilio {
    return this.destino;
  }

  public getCliente(): Usuario {
    return this.cliente;
  }
}