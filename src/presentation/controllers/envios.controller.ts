import { type Request, type Response } from 'express';
import { GetEnvioDto } from '../../application/dtos/envio/getEnvio.dto';
import { PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { StatusError } from '../errors/status.error';
import { type CreateEnvioUseCase } from '../../application/use-cases/envios/create.usecase';
import { type GetAllEnvioUseCase } from '../../application/use-cases/envios/get-all.usecase';


export class EnviosController {
  constructor(
    private readonly getAllEnvioUseCase: GetAllEnvioUseCase,
    private readonly createEnvioUseCase: CreateEnvioUseCase
  ) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const envios = await this.getAllEnvioUseCase.execute();
      const enviosDto = envios.map((envio) => GetEnvioDto.create(envio));
      res.status(200).json(enviosDto);
    } catch (error) {
      StatusError.throw(error, res);
    }
  };

  create = async (req: Request, res: Response) => {
    const envio = req.body;
    // Validate request body
    if (!envio) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    // create dto
    const [error, postEnvioDto] = PostEnvioDto.create(envio);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (postEnvioDto) {
      try {
        await this.createEnvioUseCase.execute(postEnvioDto);
        res.status(201).json({ nroSeguimiento: postEnvioDto.nroSeguimiento });
      } catch (error) {
        StatusError.throw(error, res);
      }
    }
  };
}