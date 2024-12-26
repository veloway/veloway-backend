import { type PrismaClient } from '@prisma/client';
import { Envio } from '../../domain/entities/envio.entity';
import { Domicilio } from '../../domain/entities/domicilio.entity';
import { Localidad } from '../../domain/entities/localidad.entity';
import { Provincia } from '../../domain/entities/provincia.entity';
import { Usuario } from '../../domain/entities/usuario.entity';
import { type IEnviosRepository } from '../../domain/repositories/envios.interface';
import { EstadoEnvio } from '../../domain/entities/estadoEnvio.entity';

export class EnviosRepository implements IEnviosRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getEnvio: (nroSeguimiento: number) => Promise<Envio | null>;
  getAllByClienteID: (clienteID: string) => Promise<Envio[]>;
  delete: (nroSeguimiento: number) => Promise<Envio>;

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
        envio.fecha,
        envio.hora,
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
            envio.domicilios_envios_id_origenTodomicilios.localidades.id_localidad,
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
            envio.domicilios_envios_id_destinoTodomicilios.localidades.id_localidad,
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

  public async create(envio: Envio): Promise<number> {
    if (!envio.getOrigen().getID() || !envio.getOrigen().getID()) {
      throw new Error('El origenID y destinoID son obligatorios.');
    }
    // Envio
    const envioData = await this.prisma.envios.create({
      data: {
        nro_seguimiento: envio.getNroSeguimiento(),
        descripcion: envio.getDescripcion(),
        fecha: envio.getFecha(),
        hora: envio.getHora(),
        peso_gramos: envio.getPesoGramos(),
        monto: envio.getMonto(),
        id_cliente: envio.getCliente().getID(),
        id_estado: envio.getEstado().getID(),
        id_origen: envio.getOrigen().getID(),
        id_destino: envio.getDestino().getID()
      }
    });

    return Number(envioData.nro_seguimiento);
  }

  public async buscarEnvioIgual(envio: Envio): Promise<boolean> {
    if (!envio.getOrigen().getID() || !envio.getOrigen().getID()) {
      throw new Error('El origenID y destinoID son obligatorios.');
    }

    const envioPrisma = await this.prisma.envios.findFirst({
      where: {
        descripcion: envio.getDescripcion(),
        fecha: envio.getFecha(),
        hora: envio.getHora(),
        peso_gramos: envio.getPesoGramos(),
        id_estado: envio.getEstado().getID(),
        id_cliente: envio.getCliente().getID(),
        id_origen: envio.getOrigen().getID(),
        id_destino: envio.getDestino().getID()
      }
    });

    if (!envioPrisma) {
      return false;
    }

    return true;
  }

  // TODO: VER BIEN COMO GUARDAR DATOS MODIFICADOS
  update: (envio: Envio) => Promise<Envio>;
  // public async update(envio: Envio): Promise<Envio> {
  //   const envioUpdateData = await this.prisma.envios.update({
  //     where: {
  //       nro_seguimiento: envio.getNroSeguimiento()
  //     },
  //     data: {
  //       descripcion: envio.getDescripcion(),
  //       fecha: envio.getFecha(),
  //       hora: envio.getHora(),
  //       peso_gramos: envio.getPesoGramos(),
  //       monto: envio.getMonto(),
  //       id_cliente: envio.getCliente().getID(),
  //       id_estado: envio.getEstado().getID(),
  //       id_origen: envio.getOrigen().getID(),
  //       id_destino: envio.getDestino().getID()
  //     }
  //   });

  //   // TODO: CREAR MAPEO, Y VER QUE LO QUE DEVULEVE EL UPDATE ES LO QUE LE MANDASTE.
  // };
}