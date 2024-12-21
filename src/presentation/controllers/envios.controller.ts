import { type Request, type Response } from 'express';
import { CustomError, EnvioDto, type EnviosService } from '../../application';

export class EnviosController {
  private readonly enviosService: EnviosService;

  constructor(enviosService: EnviosService) {
    this.enviosService = enviosService;
  }

  getAll = (_req: Request, res: Response) => {
    this.enviosService.getAll()
      .then((envios) => {
        const enviosDto = envios.map((envio) => EnvioDto.create(envio));

        res.status(200).json(enviosDto);
      })
      .catch((error) => {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };
}