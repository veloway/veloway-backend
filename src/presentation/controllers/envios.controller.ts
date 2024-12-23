import { type Request, type Response } from 'express';
import { type EnviosService } from '../../application/services/envios.service';
import { CustomError } from '../../application/errors/custom.errors';
import { GetEnvioDto } from '../../application/dtos/envio/getEnvio.dto';
import { PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';

export class EnviosController {
  private readonly enviosService: EnviosService;

  constructor(enviosService: EnviosService) {
    this.enviosService = enviosService;
  }

  getAll = (_req: Request, res: Response) => {
    this.enviosService.getAll()
      .then((envios) => {
        const enviosDto = envios.map((envio) => GetEnvioDto.create(envio));
        res.status(200).json(enviosDto);
      })
      .catch((error) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  create = (req: Request, res: Response) => {
    const envio = req.body;
    // Validate request body
    if (!envio) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    const [error, postEnvioDto] = PostEnvioDto.create(envio);

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (postEnvioDto) {
      this.enviosService.create(postEnvioDto)
        .then(() => {
          res.status(201).json({ nroSeguimiento: postEnvioDto.nroSeguimiento });
        })
        .catch((error) => {
          if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          res.status(500).json({ message: error.message });
        }
        );
    }
  };
}