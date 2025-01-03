import { type Domicilio } from './domicilio.entity';
import { type EstadoEnvio } from './estadoEnvio.entity';
import { type Usuario } from './usuario.entity';

export class Envio {
  constructor(
    private readonly nroSeguimiento: number,
    private descripcion: string,
    private fecha: Date,
    private hora: Date,
    private pesoGramos: number,
    private monto: number,
    private estado: EstadoEnvio,
    private origen: Domicilio,
    private destino: Domicilio,
    private cliente: Usuario
  ) {}

  // Getters
  public getNroSeguimiento(): number {
    return this.nroSeguimiento;
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
    return this.pesoGramos;
  }

  public getMonto(): number {
    return this.monto;
  }

  public getEstado(): EstadoEnvio {
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

  // Setters
  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  public setFecha(fecha: Date): void {
    this.fecha = fecha;
  }

  public setHora(hora: Date): void {
    this.hora = hora;
  }

  public setPesoGramos(pesoGramos: number): void {
    this.pesoGramos = pesoGramos;
  }

  public setMonto(monto: number): void {
    this.monto = monto;
  }

  public setEstado(estado: EstadoEnvio): void {
    this.estado = estado;
  }

  public setOrigen(origen: Domicilio): void {
    this.origen = origen;
  }

  public setDestino(destino: Domicilio): void {
    this.destino = destino;
  }

  public setCliente(cliente: Usuario): void {
    this.cliente = cliente;
  }

  // Methods
  public calcularMonto(): number {
    // Cada 100 gramos cuesta $1000
    return this.pesoGramos * 1000 / 100;
  }

  public verificarRangoHorario(): boolean {
    const hora = this.hora.getHours();
    if (hora < 8 || hora > 18) {
      return false;
    }
    return true;
  }
}