import { type Request, type Response } from 'express';
import { GetEnvioDto } from '../../application/dtos/envio/getEnvio.dto';
import { PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { HandleError } from '../errors/handle.error';
import { type EnviosService } from '../../application/services/envios.service';

export class EnviosController {
  constructor(
    private readonly enviosService: EnviosService
  ) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const envios = await this.enviosService.getAll();
      const enviosDto = envios.map((envio) => GetEnvioDto.create(envio));
      res.status(200).json(enviosDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  create = async (req: Request, res: Response) => {
    const newEnvio = req.body;
    // Validate request body
    if (!newEnvio) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    // create dto
    const [error, postEnvioDto] = PostEnvioDto.create(newEnvio);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (postEnvioDto) {
      try {
        const nroSeguimiento = await this.enviosService.create(postEnvioDto);
        res.status(201).json({ nroSeguimiento });
      } catch (error) {
        HandleError.throw(error, res);
      }
    }
  };
}