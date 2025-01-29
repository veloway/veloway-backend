import { randomUUID } from 'crypto'; // Usamos randomUUID para generar un ID único
import { CustomError } from '../errors/custom.errors';
import { Inject, Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { REPOSITORIES_TOKENS } from '../../infrastructure/dependencies/repositories-tokens.dependency';
import { type Vehiculo } from '../../domain/entities/vehiculo.entity';
import { VehiculoMapper } from '../mappers/vehiculo.mapper';
import { IVehiculoRepository } from '../../domain/repositories/vehiculo.interface';
import { type PostVehiculoDto } from '../dtos/vehiculo/postVehiculo.dto';
import { type UpdateVehiculoDto } from '../dtos/vehiculo/updateVehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor (
    @Inject(REPOSITORIES_TOKENS.IVehiculosRepository) private readonly vehiculosRepository: IVehiculoRepository
  ) {}

  // Método para crear un vehículo
  public async create(postVehiculoDto: PostVehiculoDto): Promise<number> {
    // Validación del DTO
    const [error, vehiculoDto] = PostVehiculoDto.create(postVehiculoDto);
    if (error) {
      throw CustomError.badRequest(error); // Lanzamos error si hay problemas con la validación
    }

    // Verificar si el vehículo ya existe por la patente
    const vehiculoExistente = await this.vehiculosRepository.getVehiculoByPlaca(vehiculoDto.patente);
    if (vehiculoExistente) {
      throw CustomError.badRequest('Ya existe un vehículo con esa placa');
    }

    const vehiculo = VehiculoMapper.fromPostDtoToEntity({ postVehiculoDto: vehiculoDto });

    vehiculo.setVehiculoID(randomUUID());

    // Creación del vehículo
    const vehiculoCreado = await this.vehiculosRepository.create(vehiculo);
    if (!vehiculoCreado) {
      throw CustomError.internalServerError('Error al crear el vehículo');
    }

    return vehiculoCreado.id;
  }

  // Método para actualizar un vehículo
  public async update(vehiculoID: string, updateVehiculoDto: UpdateVehiculoDto): Promise<Vehiculo> {
    // Verifica si el vehículo existe
    const vehiculoExistente = await this.vehiculosRepository.getVehiculo(vehiculoID);
    if (!vehiculoExistente) {
      throw CustomError.notFound(`No se encontró un vehículo con el ID: ${vehiculoID}`);
    }

    // Mapeo del DTO de actualización al modelo de entidad
    const vehiculoActualizado = VehiculoMapper.fromUpdateDtoToEntity({
      updateVehiculoDto,
      existingVehiculo: vehiculoExistente
    });

    // Actualiza el vehículo en el repositorio
    const vehiculoUpdated = await this.vehiculosRepository.update(vehiculoActualizado);
    // Verificar que la actualización haya sido exitosa
    if (!vehiculoUpdated) {
      throw CustomError.internalServerError('Error al actualizar el vehículo');
    }

    return vehiculoUpdated; // Retornamos el vehículo actualizado
  }

  // Método para obtener todos los vehículos
  public async getAll(): Promise<Vehiculo[]> {
    const vehiculos = await this.vehiculosRepository.getAll();
    if (!vehiculos || vehiculos.length === 0) {
      throw CustomError.notFound('No se encontraron vehículos');
    }
    return vehiculos;
  }

  // Método para obtener un vehículo por patente
  public async getVehiculo(patente: string): Promise<Vehiculo | null> {
    const vehiculo = await this.vehiculosRepository.getVehiculoByPlaca(patente);
    if (!vehiculo) {
      throw CustomError.notFound(`No se encontró el vehículo con la patente: ${patente}`);
    }
    return vehiculo;
  }

  // Método para eliminar un vehículo
  public async delete(patente: string): Promise<void> {
    // Verificar si el vehículo existe
    const vehiculoExistente = await this.vehiculosRepository.getVehiculoByPlaca(patente);
    if (!vehiculoExistente) {
      throw CustomError.notFound(`No se encontró el vehículo con la patente: ${patente}`);
    }

    // Eliminar el vehículo
    const resultado = await this.vehiculosRepository.delete(patente);
    if (!resultado) {
      throw CustomError.internalServerError('Error al eliminar el vehículo');
    }
  }
}
