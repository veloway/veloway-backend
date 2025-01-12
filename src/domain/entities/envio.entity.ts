import { EstadoEnvioEnum } from '../types/estadoEnvio.enum';
import { type Domicilio } from './domicilio.entity';
import { EstadoEnvio } from './estadoEnvio.entity';
import { type Usuario } from './usuario.entity';

export const PESO_GRAMOS_MAX = 20000;
const PRECIO_CADA_100_GRAMOS = 500;
export const HORA_INICIO = 8;
export const HORA_FIN = 18;

const fechaHoraActualTipoDate = new Date();
const fechaHoraActual = fechaHoraActualTipoDate.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false });

export class Envio {
  constructor(
    private nroSeguimiento: number,
    private descripcion: string,
    private fecha: string = fechaHoraActual.split(',')[0].trim(),
    private hora: string,
    private pesoGramos: number,
    private monto: number = this.calcularMonto(),
    private reserva: boolean = false,
    private estado: EstadoEnvio = new EstadoEnvio(EstadoEnvioEnum.Confirmado, ''),
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

  public getFecha(): string {
    return this.fecha;
  }

  public getHora(): string {
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

  public setFecha(fecha: string): void {
    this.fecha = fecha;
  }

  public setHora(hora: string): void {
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
    const hora = Number(this.hora.split(':')[0]); // HH:mm
    if (hora < HORA_INICIO || hora > HORA_FIN) {
      return false;
    }
    return true;
  }

  /* Si se manda un rango horario valido se verifica que:
    1) Si el envio no es reserva, la fecha y hora de la reserva es la actual (fecha actual por defecto)
    2) Si el envio es reserva, se verifica la fecha:
      - Si la hora actual esta fuera del rango horario, la reserva es para el dia siguiente
      - Si la hora actual esta dentro del rango horario, la reserva es para el mismo dia (fecha actual por defecto)
  */
  public verificarReserva(): void {
    if (!this.reserva) {
      this.hora = fechaHoraActual.split(',')[1].trim();
      return;
    }
    const horaActual = Number(fechaHoraActual.split(',')[1].trim().split(':')[0]); // hh:mm:ss
    console.log(horaActual);
    if (horaActual < HORA_INICIO || horaActual > HORA_FIN) {
      const nextDay = new Date(fechaHoraActualTipoDate);
      nextDay.setDate(fechaHoraActualTipoDate.getDate() + 1);
      const nextDayToString = nextDay.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false }).split(',')[0].trim();
      this.fecha = nextDayToString;
    }
  }

  public verificarPesoGramos(): boolean {
    if (this.pesoGramos > PESO_GRAMOS_MAX) {
      return false;
    }
    return true;
  }
}