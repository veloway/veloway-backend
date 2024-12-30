import { type Domicilio } from './domicilio.entity';
import { type EstadoEnvio } from './estadoEnvio.entity';
import { type Usuario } from './usuario.entity';

export const PESO_GRAMOS_MAX = 20000;
const PRECIO_CADA_100_GRAMOS = 500;
const HORA_INICIO = 8;
const HORA_FIN = 18;

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
    return this.pesoGramos * PRECIO_CADA_100_GRAMOS / 100;
  }

  /* Validar que la hora en que se quiera realizar el envio este entre las 8:00 y 18:00,
       si no queda para el dia siguiente entre el mismo rango horario. */
  public verificarRangoHorario() {
    if (this.hora.getUTCHours() < HORA_INICIO || this.hora.getUTCHours() > HORA_FIN) {
      const newDate = new Date(this.getFecha().getTime() + 86400000); // 86400000 = 24 horas en milisegundos (1 dia)
      const newHour = new Date(this.getFecha());
      newHour.setUTCHours(8, 0, 0, 0);

      this.setFecha(newDate);
      this.setHora(newHour);
    }
  }

  public verificarPesoGramos(): boolean {
    if (this.pesoGramos > PESO_GRAMOS_MAX) {
      return false;
    }
    return true;
  }
}