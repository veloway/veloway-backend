import { type Request, type Response } from 'express';
import { ViajesService } from '../../application/services/viajes.service';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { GetViajeDto } from '../../application/dtos/viaje/getViaje.dto';
import { HandleError } from '../errors/handle.error';
import { GetAllByConductorIdDto } from '../../application/dtos/viaje/getAllByConductorId.dto';

@Injectable()
export class ViajesController {
  constructor(
    private readonly viajesService: ViajesService
  ) {}

  getAllByConductorId = async (req: Request, res: Response) => {
    const { conductorId } = req.params;
    try {
      const viajes = await this.viajesService.getAllByConductoresId(conductorId);
      const viajesDto = viajes.map((viaje) => GetAllByConductorIdDto.create(viaje));
      res.status(200).json(viajesDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  getViaje = async (req: Request, res: Response) => {
    const { idViaje } = req.params;
    try {
      const viaje = await this.viajesService.getViaje(Number(idViaje));
      const viajesDto = GetViajeDto.create(viaje);
      res.status(200).json(viajesDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}

