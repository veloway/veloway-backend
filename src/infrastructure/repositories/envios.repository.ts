import { Domicilio, Envio, Usuario, type EnviosI } from '../../domain';
import { type PrismaClient } from '@prisma/client';


export class EnviosRepository implements EnviosI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getAll(): Promise<Envio[]> {
    const enviosPrisma = await this.prisma.envios.findMany(
      {
        include: {
          usuarios: true,
          estados_envio: {
            select: {
              nombre: true
            }
          },
          domicilios_envios_id_origenTodomicilios: true,
          domicilios_envios_id_destinoTodomicilios: true
        }
      }
    );

    // Mapping
    const enviosEntities = enviosPrisma.map((envio) => {
      return new Envio(
        envio.nro_seguimiento.toString(),
        envio.descripcion,
        envio.fecha,
        envio.hora,
        parseFloat(envio.peso_gramos.toString()),
        envio.estados_envio.nombre,
        new Domicilio(
          envio.domicilios_envios_id_origenTodomicilios.id_domicilio,
          envio.domicilios_envios_id_origenTodomicilios.calle,
          envio.domicilios_envios_id_origenTodomicilios.numero,
          envio.domicilios_envios_id_origenTodomicilios.id_localidad,
          envio.domicilios_envios_id_origenTodomicilios.id_usuario || '', // TODO:Corregir
          envio.domicilios_envios_id_origenTodomicilios.piso || null,
          envio.domicilios_envios_id_origenTodomicilios.depto || null,
          envio.domicilios_envios_id_origenTodomicilios.descripcion || null
        ),
        new Domicilio(
          envio.domicilios_envios_id_destinoTodomicilios.id_domicilio,
          envio.domicilios_envios_id_destinoTodomicilios.calle,
          envio.domicilios_envios_id_destinoTodomicilios.numero,
          envio.domicilios_envios_id_destinoTodomicilios.id_localidad,
          envio.domicilios_envios_id_destinoTodomicilios.id_usuario || '', // TODO:Corregir
          envio.domicilios_envios_id_destinoTodomicilios.piso || null,
          envio.domicilios_envios_id_destinoTodomicilios.depto || null,
          envio.domicilios_envios_id_destinoTodomicilios.descripcion || null
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
      id_cliente: envio.getCliente().getIdUsuario(),
      id_estado: Number(envio.getEstado()), // TODO: Ver si se puede hacer un mapeo, porque tiene que ser un numero, no un string
      id_origen: envio.getOrigen().getIdDomicilio(),
      id_destino: envio.getDestino().getIdDomicilio()
    };

    await this.prisma.envios.create({ data: dataPrisma });
  }
}