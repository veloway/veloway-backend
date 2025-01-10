import { randomInt } from 'crypto';
import { EstadoEnvioEnum } from '../types/estadoEnvio.enum';
import { type Domicilio } from './domicilio.entity';
import { EstadoEnvio } from './estadoEnvio.entity';
import { type Usuario } from './usuario.entity';
import { DateTime } from 'luxon';

export const PESO_GRAMOS_MAX = 20000;
const PRECIO_CADA_100_GRAMOS = 500;
export const HORA_INICIO = 8;
export const HORA_FIN = 18;

export class Envio {
  constructor(
    private nroSeguimiento: number,
    private descripcion: string,
    private fecha: Date = DateTime.now().setZone('America/Argentina/Buenos_Aires').toJSDate(),
    private hora: Date,
    private pesoGramos: number,
    private monto: number = this.calcularMonto(),
    private reserva: boolean = false,
    private estado: EstadoEnvio = new EstadoEnvio(EstadoEnvioEnum.Confirmado, ''),
    private origen: Domicilio,
    private destino: Domicilio,
    private cliente: Usuario
  ) {
    this.nroSeguimiento ||= randomInt(10000000, 99999999);
  }

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

  public getReserva(): boolean {
    return this.reserva;
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
  public setNroSeguimiento(nroSeguimiento: number): void {
    this.nroSeguimiento = nroSeguimiento;
  }

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

  public setReserva(reserva: boolean): void {
    this.reserva = reserva;
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

  // Verificacion del rango horario que viene en el json
  public verificarRangoHorario(): boolean {
    if (this.hora.getUTCHours() < HORA_INICIO || this.hora.getUTCHours() > HORA_FIN) {
      return false;
    }
    return true;
  }

  /* Si se manda un rango horario valido se verifica que:
    1) Si el envio no es reserva, la fecha y hora de la reserva es la actual
    2) Si el envio es reserva, se verifica la fecha:
      - Si la hora actual esta fuera del rango horario, la reserva es para el dia siguiente
      - Si la hora actual esta dentro del rango horario, la reserva es para el mismo dia
  */
  public verificarReserva(): void {
    if (!this.reserva) {
      console.log('Fecha y Hora actual: ', this.fecha);
      this.hora = this.fecha; // Hora de la fecha actual por defecto
      return;
    }
    if (this.fecha.getUTCHours() < HORA_INICIO || this.fecha.getUTCHours() > HORA_FIN) {
      this.fecha.setDate(this.fecha.getDate() + 1);
    }
  }

  public verificarPesoGramos(): boolean {
    if (this.pesoGramos > PESO_GRAMOS_MAX) {
      return false;
    }
    return true;
  }
}