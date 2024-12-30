import { type Request, type Response } from 'express';
import { PostViajeDto } from '../../application/dtos/viaje/getViaje.dto';
import { HandleError } from '../errors/handle.error';
import { type ViajesService } from '../../application/services/viajes.service';

export class EnviosController {
  constructor(
    private readonly ViajesService: ViajesService
  ) {}

  create = async (req: Request, res: Response) => {
    const newEnvio = req.body;
    if (!newEnvio) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    const [error, postViajeDto] = PostViajeDto.create(newEnvio);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (postViajeDto) {
      try {
        const viaje = await this.ViajesService.create(postViajeDto);
        res.status(201).json({ viaje });
      } catch (error) {
        HandleError.throw(error, res);
      }
    }
  };
};
