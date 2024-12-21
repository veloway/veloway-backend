import { z } from 'zod';
import { Domicilio, Localidad, Provincia } from '../../../domain';
import { randomInt } from 'crypto';

export class PostEnvioDto {
  private constructor(
    public nroSeguimiento: number,
    public descripcion: string,
    public fecha: string,
    public hora: string,
    public pesoGramos: number,
    public monto: number,
    public estado: number,
    public origen: Domicilio,
    public destino: Domicilio,
    public clienteID: string
  ) {
    nroSeguimiento = randomInt(100000, 999999); // TODO: NO ESTA FUNCIONANDO EL RANDOM, CORREGIR!!!!
  }

  public static create(envio: any): [string?, PostEnvioDto?] {
    const envioValidation = EnvioSchema.safeParse(envio);

    if (!envioValidation.success) {
      return [JSON.parse(envioValidation.error.message)];
    }

    return [undefined, new PostEnvioDto(
      envio.nroSeguimiento,
      envioValidation.data.descripcion,
      envioValidation.data.fecha,
      envioValidation.data.hora,
      envioValidation.data.pesoGramos,
      envioValidation.data.monto,
      envioValidation.data.estado,
      new Domicilio(
        envioValidation.data.origen.calle,
        envioValidation.data.origen.numero,
        new Localidad(
          envioValidation.data.origen.localidad.codigoPostal,
          envioValidation.data.origen.localidad.nombre,
          new Provincia(envioValidation.data.origen.localidad.provincia.nombre)
        ),
        envioValidation.data.origen.piso,
        envioValidation.data.origen.depto,
        envioValidation.data.origen.descripcion
      ),
      new Domicilio(
        envioValidation.data.destino.calle,
        envioValidation.data.destino.numero,
        new Localidad(
          envioValidation.data.destino.localidad.codigoPostal,
          envioValidation.data.destino.localidad.nombre,
          new Provincia(envioValidation.data.destino.localidad.provincia.nombre)
        ),
        envioValidation.data.destino.piso,
        envioValidation.data.destino.depto,
        envioValidation.data.destino.descripcion
      ),
      envioValidation.data.cliente

    )];
  }
}


export const ProvinciaSchema = z.object({
  nombre: z.string()
});

export const LocalidadSchema = z.object({
  codigoPostal: z.number().int(),
  nombre: z.string(),
  provincia: ProvinciaSchema
});

export const DomicilioSchema = z.object({
  calle: z.string(),
  numero: z.number().int(),
  piso: z.number().int().nullable(),
  depto: z.string().nullable(),
  descripcion: z.string().nullable(),
  localidad: LocalidadSchema

});

export const EnvioSchema = z.object({
  descripcion: z.string(),
  fecha: z.string(), // TODO: CAMBIAR STRING A FECHA
  hora: z.string(),
  pesoGramos: z.number().int(),
  monto: z.number().int(),
  estado: z.number(),
  origen: DomicilioSchema,
  destino: DomicilioSchema,
  cliente: z.string()
});

export const envioValidation = (envio: any) => {
  return EnvioSchema.safeParse(envio);
};