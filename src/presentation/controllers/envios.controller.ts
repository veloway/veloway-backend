import { type Request, type Response } from 'express';
import { bigIntReplacer } from '../../utils/bigIntReplacer';
import { plainToClass } from 'class-transformer';
import { CustomError, EnvioDto } from '../../application';
import { type EnviosI } from '../../domain';

export class EnviosController {
  private readonly enviosService: EnviosI;

  constructor(enviosService: EnviosI) {
    this.enviosService = enviosService;
  }

  getAll = (_req: Request, res: Response) => {
    this.enviosService.getAll()
      .then((envios) => {
        const jsonResponse = JSON.stringify(envios, bigIntReplacer); // conversion del bigint
        const jsonParse = JSON.parse(jsonResponse);
        const enviosDto = plainToClass(EnvioDto, jsonParse, { excludeExtraneousValues: true }); // conversion a dto
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