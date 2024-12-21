import { Domicilio, Envio, EstadoEnvio, Localidad, Provincia, Usuario, type EnviosI } from '../../domain';
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
        new EstadoEnvio(
          envio.estados_envio.id_estado,
          envio.estados_envio.nombre
        ),
        new Domicilio(
          envio.domicilios_envios_id_origenTodomicilios.id_domicilio,
          envio.domicilios_envios_id_origenTodomicilios.calle,
          envio.domicilios_envios_id_origenTodomicilios.numero,
          new Localidad(
            envio.domicilios_envios_id_origenTodomicilios.localidades.codigo_postal,
            envio.domicilios_envios_id_origenTodomicilios.localidades.nombre,
            new Provincia(
              envio.domicilios_envios_id_origenTodomicilios.localidades.provincias.id_provincia,
              envio.domicilios_envios_id_origenTodomicilios.localidades.provincias.nombre
            )
          ),
          envio.domicilios_envios_id_origenTodomicilios.piso,
          envio.domicilios_envios_id_origenTodomicilios.depto,
          envio.domicilios_envios_id_origenTodomicilios.descripcion
        ),
        new Domicilio(
          envio.domicilios_envios_id_destinoTodomicilios.id_domicilio,
          envio.domicilios_envios_id_destinoTodomicilios.calle,
          envio.domicilios_envios_id_destinoTodomicilios.numero,
          new Localidad(
            envio.domicilios_envios_id_destinoTodomicilios.localidades.codigo_postal,
            envio.domicilios_envios_id_destinoTodomicilios.localidades.nombre,
            new Provincia(
              envio.domicilios_envios_id_destinoTodomicilios.localidades.provincias.id_provincia,
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

  public async create(envio: Envio): Promise<void> {
    const dataPrisma = {
      nro_seguimiento: Number(envio.getNroSeguimiento()),
      descripcion: envio.getDescripcion(),
      fecha: envio.getFecha(),
      hora: envio.getHora(),
      peso_gramos: envio.getPesoGramos(),
      monto: envio.getMonto(),
      id_cliente: envio.getCliente().getIdUsuario(),
      id_estado: envio.getEstado().getIdEstado(),
      id_origen: envio.getOrigen().getIdDomicilio(),
      id_destino: envio.getDestino().getIdDomicilio()
    };

    await this.prisma.envios.create({ data: dataPrisma });
  }
}