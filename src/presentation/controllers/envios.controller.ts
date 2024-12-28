import { type Request, type Response } from 'express';
import { GetEnvioDto } from '../../application/dtos/envio/getEnvio.dto';
import { PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { HandleError } from '../errors/handle.error';
import { type EnviosService } from '../../application/services/envios.service';
import { UpdateEnvioDto } from '../../application/dtos/envio/udpateEnvio.dto';

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

  getAllByClienteId = async (req: Request, res: Response) => {
    const { clienteID } = req.params;
    try {
      const envios = await this.enviosService.getAllByClienteId(clienteID);
      const enviosDto = envios.map((envio) => GetEnvioDto.create(envio));
      res.status(200).json(enviosDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  getEnvio = async (req: Request, res: Response) => {
    const { nroSeguimiento } = req.params;
    try {
      const envio = await this.enviosService.getEnvio(Number(nroSeguimiento));
      const envioDto = GetEnvioDto.create(envio);
      res.status(200).json(envioDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };

  create = async (req: Request, res: Response) => {
    const newEnvio = req.body;
    if (!newEnvio) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

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

  update = async (req: Request, res: Response) => {
    const { nroSeguimiento } = req.params;
    const updateEnvio = req.body;
    if (!updateEnvio) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    const [error, updateEnvioDto] = UpdateEnvioDto.create(updateEnvio);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (updateEnvioDto) {
      try {
        const envioUpdated = await this.enviosService.update(Number(nroSeguimiento), updateEnvioDto);
        const envioDto = GetEnvioDto.create(envioUpdated);
        res.status(200).json(envioDto);
      } catch (error) {
        HandleError.throw(error, res);
      }
    }
  };

  updateEstadoEnvio = async (req: Request, res: Response) => {
    const { nroSeguimiento } = req.params;
    const { estadoEnvioID } = req.body;
    try {
      await this.enviosService.updateEstadoEnvio(Number(nroSeguimiento), Number(estadoEnvioID));
      res.status(200).json({ message: 'Estado de envío actualizado' });
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}