// import { Injectable, Inject } from '../../infrastructure/dependencies/injectable.dependency';
// import { randomUUID } from 'crypto';
// import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
// import { PostCondutorDto } from '../dtos/conductor/postConductor.dto';
// import { Conductor } from '../../domain/entities/conductor.entity';
// import { ConductoresRepository } from '../../infrastructure/repositories/conductores.repository';

// @Injectable()
// export class ConductorService {
//     constructor(
//         @Inject(REPOSITORIES_TOKENS.IUsuariosRepository)
//         private readonly conductorRepository: ConductoresRepository,
//     ) {

//     }


//     public async register(data: PostCondutorDto): Promise<Conductor> {
//         const { compartirFichaMedica, idUsuario } = data;


//         const id = randomUUID(); // Generar UUID en el servicio
//         // const driverState = new EstadoConductor ("dos argumentos")
        

//         // Crear la entidad de usuario
//         const conductor = new Conductor(
//             idUsuario,
//             compartirFichaMedica,
//             // EstadoConductor


//         );

//         // Guardar el usuario en la base de datos
//         await this.ConductorRepository.create(conductor);

//         return conductor;
//     }

// }

