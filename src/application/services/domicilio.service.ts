import { Injectable, Inject } from '../../infrastructure/dependencies/injectable.dependency';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { PostDomicilioDto } from '../dtos/domicilio/postDomicilio.dto';
import { Domicilio } from '../../domain/entities/domicilio.entity';
import { DomiciliosRepository } from '../../infrastructure/repositories/domicilios.repository';
import { LocalidadesRepository } from '../../infrastructure/repositories/localidades.repository';

@Injectable()
export class DomicilioService {

    constructor(
        @Inject(REPOSITORIES_TOKENS.IDomiciliosRepository)
        private readonly domicilioRepository: DomiciliosRepository,
        private readonly localidadRepository: LocalidadesRepository
    ) { }


    public async create(data: PostDomicilioDto): Promise<Domicilio> {
        const {
            calle,
            numero,
            localidadID,
            piso,
            depto,
            descripcion } = data;


        const id = await this.domicilioRepository.getLastId() + 1 ;
        const localidad = await this.localidadRepository.getLocalidad(localidadID)
        
        if (!localidad){
            throw new Error('La localidad no existe.');
        }

        const domicilio = new Domicilio(
            id,
            calle,
            numero,
            localidad,
            piso,
            depto,
            descripcion );

        // Guardar el usuario en la base de datos
        await this.domicilioRepository.create(domicilio);

        return domicilio;
    }

    public async modificarDomicilio(id: number, data: any): Promise<void> {
        try {
          // Verificamos si el usuario existe
          const existente = await this.domicilioRepository.getById(id)
    
          if (!existente) {
            throw new Error('Domicilio no encontrado');
          }
    
          // Si el usuario existe, procedemos con la actualización
          await this.domicilioRepository.update(id, data)
        } catch (error) {
          console.error('Error en el servicio al modificar usuario:', error);
          throw new Error('No se pudo modificar el usuario');
        }
      }
}

