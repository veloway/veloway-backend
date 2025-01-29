import { type Request, type Response } from 'express';
import { HandleError } from '../errors/handle.error';
import { VehiculosService } from '../../application/services/vehiculo.service';
import { GetVehiculoDto } from '../../application/dtos/vehiculo/getVehiculo.dto';
import { PostVehiculoDto } from '../../application/dtos/vehiculo/postVehiculo.dto';
import { UpdateVehiculoDto } from '../../application/dtos/vehiculo/updateVehiculo.dto';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';

@Injectable()
export class VehiculosController {
  constructor(
    private readonly vehiculosService: VehiculosService
  ) {}


  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const vehiculos = await this.vehiculosService.getAll();
      const vehiculosDto = vehiculos.map((vehiculo) => GetVehiculoDto.create(vehiculo));
      res.status(200).json(vehiculosDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  getVehiculo = async (req: Request, res: Response): Promise<void> => {
    const { patente } = req.params;
    try {
      const vehiculo = await this.vehiculosService.getVehiculo(patente);
      if (!vehiculo) {
        res.status(404).json({ message: 'Vehículo no encontrado' });
        return;
      }
      const vehiculoDto = GetVehiculoDto.create(vehiculo);
      res.status(200).json(vehiculoDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newVehiculo = req.body;
    if (!newVehiculo) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    const [error, postVehiculoDto] = PostVehiculoDto.create(newVehiculo);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    try {
      if (postVehiculoDto) {
        const patente = await this.vehiculosService.create(postVehiculoDto);
        res.status(201).json({ patente });
      } else {
        res.status(400).json({ message: 'Error al crear el vehículo' });
      }
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { patente } = req.params;
    const updateVehiculo = req.body;
    if (!updateVehiculo) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    const [error, updateVehiculoDto] = UpdateVehiculoDto.create(updateVehiculo);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    try {
      if (updateVehiculoDto) {
        const vehiculoUpdated = await this.vehiculosService.update(patente, updateVehiculoDto);
        const vehiculoDto = GetVehiculoDto.create(vehiculoUpdated);
        res.status(200).json(vehiculoDto);
      } else {
        res.status(400).json({ message: 'Error al actualizar el vehículo' });
      }
    } catch (error) {
      HandleError.throw(error, res);
    }
  };


  delete = async (req: Request, res: Response): Promise<void> => {
    const { patente } = req.params;
    try {
      await this.vehiculosService.delete(patente);
      res.status(200).json({ message: 'Vehículo eliminado' });
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}
