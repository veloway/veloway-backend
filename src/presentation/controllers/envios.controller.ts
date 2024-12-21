import { type Request, type Response } from 'express';
import { CustomError, GetEnvioDto, PostEnvioDto, type EnviosService } from '../../application';

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

    const [error, postEnvioDto] = PostEnvioDto.create(envio);

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (postEnvioDto) {
      this.enviosService.create(postEnvioDto)
        .then(() => {
          res.status(201).json({ message: 'Envio creado' });
        })
        .catch((error) => {
          if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          res.status(500).json({ message: 'Internal Server Error' });
        }
        );
    }
  };
}