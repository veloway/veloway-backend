import { z } from 'zod';
import { Domicilio, Localidad, Provincia } from '../../../domain';
import { randomInt } from 'crypto';

export class PostEnvioDto {
  private constructor(
    public nroSeguimiento: number,
    public descripcion: string,
    public fecha: Date,
    public hora: Date,
    public pesoGramos: number,
    public monto: number,
    public estado: number,
    public origen: Domicilio,
    public destino: Domicilio,
    public clienteID: string
  ) {
    nroSeguimiento = randomInt(100000, 999999);
  }

  public static create(envio: any): [string?, PostEnvioDto?] {
    const envioValidation = EnvioSchema.safeParse(envio);

    if (!envioValidation.success) {
      return [envioValidation.error.message];
    }

    return [undefined, new PostEnvioDto(
      envio.nroSeguimiento,
      envio.descripcion,
      envio.fecha,
      envio.hora,
      envio.pesoGramos,
      envio.monto,
      envio.estado,
      new Domicilio(
        envio.origen.calle,
        envio.origen.numero,
        new Localidad(
          envio.origen.localidad.codigoPostal,
          envio.origen.localidad.nombre,
          new Provincia(
            envio.origen.localidad.provincia.nombre
          )
        ),
        envio.origen.piso,
        envio.origen.depto,
        envio.origen.descripcion
      ),
      new Domicilio(
        envio.destino.calle,
        envio.destino.numero,
        new Localidad(
          envio.destino.localidad.codigoPostal,
          envio.destino.localidad.nombre,
          new Provincia(
            envio.destino.localidad.provincia.nombre
          )
        ),
        envio.destino.piso,
        envio.destino.depto,
        envio.destino.descripcion
      ),
      envio.cliente.idUsuario
    )];

    // return new PostEnvioDto(
    //   envio.getNroSeguimiento(),
    //   envio.getDescripcion(),
    //   envio.getFecha(),
    //   envio.getHora(),
    //   envio.getPesoGramos(),
    //   envio.getMonto(),
    //   envio.getEstado(),
    //   new Domicilio(
    //     envio.getOrigen().getCalle(),
    //     envio.getOrigen().getNumero(),
    //     new Localidad(
    //       envio.getOrigen().getLocalidad().getCodigoPostal(),
    //       envio.getOrigen().getLocalidad().getNombre(),
    //       new Provincia(
    //         envio.getOrigen().getLocalidad().getProvincia().getNombre()
    //       )
    //     ),
    //     envio.getOrigen().getPiso(),
    //     envio.getOrigen().getDepto(),
    //     envio.getOrigen().getDescripcion()
    //   ),
    //   new Domicilio(
    //     envio.getDestino().getCalle(),
    //     envio.getDestino().getNumero(),
    //     new Localidad(
    //       envio.getDestino().getLocalidad().getCodigoPostal(),
    //       envio.getDestino().getLocalidad().getNombre(),
    //       new Provincia(
    //         envio.getDestino().getLocalidad().getProvincia().getNombre()
    //       )
    //     ),
    //     envio.getDestino().getPiso(),
    //     envio.getDestino().getDepto(),
    //     envio.getDestino().getDescripcion()
    //   ),
    //   envio.getCliente().getIdUsuario()
    // );
  }
}



export const ProvinciaSchema = z.object({
  nombre: z.string()
});

export const LocalidadSchema = z.object({
  codigoPostal: z.string(),
  nombre: z.string(),
  provincia: ProvinciaSchema
});

export const DomicilioSchema = z.object({
  calle: z.string(),
  numero: z.number().int(),
  codigoPostal: z.string(),
  piso: z.number().int().nullable(),
  depto: z.string().nullable(),
  descripcion: z.string().nullable(),
  localidad: LocalidadSchema

});

export const EnvioSchema = z.object({
  descripcion: z.string(),
  fecha: z.date(),
  hora: z.date(),
  pesoGramos: z.number().int(),
  monto: z.number().int(),
  estado: z.string(),
  origen: DomicilioSchema,
  destino: DomicilioSchema,
  cliente: z.string()
});

export const envioValidation = (envio: any) => {
  return EnvioSchema.safeParse(envio);
};