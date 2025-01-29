import { EstadoVehiculo } from './estadoVehiculo.entity';
import { EstadoVehiculoEnum } from '../types/estadoVehiculo.enum';


interface Modelo {
  nombre: string
  marca: string
}

interface TipoVehiculo {
  nombre: string
  modelo: Modelo
}

export class Vehiculo {
  constructor(
    private readonly idVehiculo: number,
    private readonly patente: string,
    private modelo: Modelo,
    private tipoVehiculo: TipoVehiculo,
    private anio: string,
    private estado: EstadoVehiculo = new EstadoVehiculo(EstadoVehiculoEnum.Habilitado, ''),
    private titular: { nombre: string, documento: string },
    private color: string,
    private descripcion: string,
    private nomSeguro: string
  ) {}


  public getIdVehiculo(): number {
    return this.idVehiculo;
  }

  public getPatente(): string {
    return this.patente;
  }

  public getMarca(): string {
    return this.modelo.marca;
  }

  public getModelo(): string {
    return this.modelo.nombre;
  }

  public getTipoVehiculo(): TipoVehiculo {
    return this.tipoVehiculo;
  }

  public getAnio(): string {
    return this.anio;
  }

  public getEstadoVehiculo(): EstadoVehiculo {
    return this.estado;
  }

  public getColor(): string {
    return this.color;
  }

  public getTitular(): { nombre: string, documento: string } {
    return this.titular;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public getNomSeguro(): string {
    return this.nomSeguro;
  }

  public setModelo(modelo: Modelo): void {
    this.modelo = modelo;
  }

  public setTipoVehiculo(tipoVehiculo: TipoVehiculo): void {
    this.tipoVehiculo = tipoVehiculo;
  }

  public setAnio(anio: string): void {
    this.anio = anio;
  }

  public setEstadoVehiculo(estado: EstadoVehiculo): void {
    this.estado = estado;
  }

  public setTitular(titular: { nombre: string, documento: string }): void {
    this.titular = titular;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  public setNomSeguro(nomSeguro: string): void {
    this.nomSeguro = nomSeguro;
  }
}
