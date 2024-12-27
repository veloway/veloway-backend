import { Envio } from '../../domain/entities/envio.entity';
import { Domicilio } from '../../domain/entities/domicilio.entity';
import { Localidad } from '../../domain/entities/localidad.entity';
import { Provincia } from '../../domain/entities/provincia.entity';
import { Usuario } from '../../domain/entities/usuario.entity';
import { EstadoEnvio } from '../../domain/entities/estadoEnvio.entity';
import { type usuarios, type Prisma } from '@prisma/client';

interface IEnviosPrismaMapper extends Prisma.enviosGetPayload<
{
  include: {
    usuarios: true
    estados_envio: true
    domicilios_envios_id_origenTodomicilios: {
      include: {
        localidades: {
          include: {
            provincias: true
          }
        }
      }
    }
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
> {}

export class EnvioPrismaMapper {
  public static fromPrismaToEntity(envio: IEnviosPrismaMapper): Envio {
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
      this.mapDomicilio(
        envio.domicilios_envios_id_origenTodomicilios,
        envio.domicilios_envios_id_origenTodomicilios.localidades
      ),
      this.mapDomicilio(
        envio.domicilios_envios_id_destinoTodomicilios,
        envio.domicilios_envios_id_destinoTodomicilios.localidades
      ),
      this.mapUsuario(envio.usuarios)
    );
  }

  public static fromPrismaArrayToEntity(envios: IEnviosPrismaMapper[]): Envio[] {
    return envios.map((envio) => this.fromPrismaToEntity(envio));
  }

  private static mapDomicilio(
    domicilio: Prisma.domiciliosGetPayload<{
      include: { localidades: { include: { provincias: true } } }
    }>,
    localidad: Prisma.localidadesGetPayload<{
      include: { provincias: true }
    }>

  ): Domicilio {
    return new Domicilio(
      domicilio.id_domicilio,
      domicilio.calle,
      domicilio.numero,
      new Localidad(
        localidad.id_localidad,
        localidad.codigo_postal,
        localidad.nombre,
        new Provincia(
          localidad.provincias.id_provincia,
          localidad.provincias.nombre
        )
      ),
      domicilio.piso,
      domicilio.depto,
      domicilio.descripcion
    );
  }

  private static mapUsuario(usuario: usuarios): Usuario {
    return new Usuario(
      usuario.id_usuario,
      usuario.dni,
      usuario.email,
      usuario.password,
      usuario.fecha_nac,
      usuario.nombre,
      usuario.apellido,
      usuario.es_conductor,
      usuario.telefono
    );
  }
}
