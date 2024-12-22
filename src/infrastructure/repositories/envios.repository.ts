import { type PostEnvioDto } from '../../application';
import { Domicilio, Envio, Localidad, Provincia, Usuario, type EnviosI } from '../../domain';
import { type PrismaClient } from '@prisma/client';

export class EnviosRepository implements EnviosI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getAll(): Promise<Envio[]> {
    const enviosPrisma = await this.prisma.envios.findMany(
      {
        include: {
          usuarios: true,
          estados_envio: true,
          domicilios_envios_id_origenTodomicilios: {
            include: {
              localidades: {
                include: {
                  provincias: true
                }
              }
            }
          },
          domicilios_envios_id_destinoTodomicilios: {
            include: {
              localidades: {
                include: {
                  provincias: true
                }
              }
            }
          }
        }
      }
    );

    // Mapping
    const enviosEntities = enviosPrisma.map((envio) => {
      return new Envio(
        Number(envio.nro_seguimiento.toString()),
        envio.descripcion,
        envio.fecha, // TODO: Parsear para que muestre solo la fecha
        envio.hora, // TODO: Parsear para que muestre solo la hora
        parseFloat(envio.peso_gramos.toString()),
        Number(envio.monto),
        envio.estados_envio.nombre,
        new Domicilio(
          envio.domicilios_envios_id_origenTodomicilios.calle,
          envio.domicilios_envios_id_origenTodomicilios.numero,
          new Localidad(
            envio.domicilios_envios_id_origenTodomicilios.localidades.codigo_postal,
            envio.domicilios_envios_id_origenTodomicilios.localidades.nombre,
            new Provincia(
              envio.domicilios_envios_id_origenTodomicilios.localidades.provincias.nombre
            )
          ),
          envio.domicilios_envios_id_origenTodomicilios.piso,
          envio.domicilios_envios_id_origenTodomicilios.depto,
          envio.domicilios_envios_id_origenTodomicilios.descripcion
        ),
        new Domicilio(
          envio.domicilios_envios_id_destinoTodomicilios.calle,
          envio.domicilios_envios_id_destinoTodomicilios.numero,
          new Localidad(
            envio.domicilios_envios_id_destinoTodomicilios.localidades.codigo_postal,
            envio.domicilios_envios_id_destinoTodomicilios.localidades.nombre,
            new Provincia(
              envio.domicilios_envios_id_destinoTodomicilios.localidades.provincias.nombre
            )
          ),
          envio.domicilios_envios_id_destinoTodomicilios.piso,
          envio.domicilios_envios_id_destinoTodomicilios.depto,
          envio.domicilios_envios_id_destinoTodomicilios.descripcion
        ),
        new Usuario(
          envio.usuarios.id_usuario,
          envio.usuarios.dni,
          envio.usuarios.email,
          envio.usuarios.password,
          envio.usuarios.fecha_nac,
          envio.usuarios.nombre,
          envio.usuarios.apellido,
          envio.usuarios.es_conductor,
          envio.usuarios.telefono || undefined
        )
      );
    });

    return enviosEntities;
  }

  public async create(envio: PostEnvioDto): Promise<void> {
    // Origen
    const provOrigen = await this.prisma.provincias.create({
      data: {
        nombre: envio.origen.localidad.provincia.nombre
      }
    });

    const localidadOrigen = await this.prisma.localidades.create({
      data: {
        codigo_postal: envio.origen.localidad.codigoPostal,
        nombre: envio.origen.localidad.nombre,
        id_provincia: provOrigen.id_provincia
      }
    });

    const domOrigen = await this.prisma.domicilios.create({
      data: {
        calle: envio.origen.calle,
        numero: envio.origen.numero,
        piso: envio.origen.piso,
        depto: envio.origen.depto,
        descripcion: envio.origen.descripcion,
        id_localidad: localidadOrigen.id_localidad
      }
    });

    // Destino
    const provDestino = await this.prisma.provincias.create({
      data: {
        nombre: envio.destino.localidad.provincia.nombre
      }
    });

    const localidadDestino = await this.prisma.localidades.create({
      data: {
        codigo_postal: envio.destino.localidad.codigoPostal,
        nombre: envio.destino.localidad.nombre,
        id_provincia: provDestino.id_provincia
      }
    });

    const domDestino = await this.prisma.domicilios.create({
      data: {
        calle: envio.destino.calle,
        numero: envio.destino.numero,
        piso: envio.destino.piso,
        depto: envio.destino.depto,
        descripcion: envio.destino.descripcion,
        id_localidad: localidadDestino.id_localidad
      }
    });

    // Eliminar el log despues de probar
    console.log({
      nro_seguimiento: envio.nroSeguimiento,
      descripcion: envio.descripcion,
      fecha: envio.fecha,
      hora: envio.hora,
      peso_gramos: envio.pesoGramos,
      monto: envio.monto,
      id_cliente: envio.clienteID,
      id_estado: envio.estado,
      id_origen: domOrigen.id_domicilio,
      id_destino: domDestino.id_domicilio
    });

    // Envio
    await this.prisma.envios.create({
      data: {
        nro_seguimiento: envio.nroSeguimiento,
        descripcion: envio.descripcion,
        fecha: envio.fecha,
        hora: envio.hora,
        peso_gramos: envio.pesoGramos,
        monto: envio.monto,
        id_cliente: envio.clienteID,
        id_estado: envio.estado,
        id_origen: domOrigen.id_domicilio,
        id_destino: domDestino.id_domicilio
      }
    });
  }
}