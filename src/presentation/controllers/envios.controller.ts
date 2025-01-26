import { type Request, type Response } from 'express';
import { GetEnvioDto } from '../../application/dtos/envio/getEnvio.dto';
import { PostEnvioDto } from '../../application/dtos/envio/postEnvio.dto';
import { HandleError } from '../errors/handle.error';
import { EnviosService } from '../../application/services/envios.service';
import { UpdateEnvioDto } from '../../application/dtos/envio/udpateEnvio.dto';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';

@Injectable()
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
    const { limit, offset, page } = req.query;

    if (!clienteID) {
      res.status(400).json({ message: 'Cliente ID es requerido' });
      return;
    }

    if ((limit && isNaN(Number(limit))) || (offset && isNaN(Number(offset))) || (page && isNaN(Number(page)))) {
      res.status(400).json({ message: 'Limit, offset y page tienen que ser números' });
      return;
    }

    if (Number(limit) < 0 || Number(offset) < 0 || Number(page) < 0) {
      res.status(400).json({ message: 'Limit, offset y page tienen que ser mayores a 0' });
      return;
    }

    const paginationOptions = {
      limit: limit ? Number(limit) : 10,
      offset: offset ? (page ? (Number(page) - 1) * Number(limit) : Number(offset)) : 0
    };

    try {
      const totalEnvios = await this.enviosService.totalEnviosByClienteId(clienteID);
      const envios = await this.enviosService.getAllByClienteId(clienteID, paginationOptions);
      const enviosDto = envios.map((envio) => GetEnvioDto.create(envio));

      const lastPage = Math.ceil(totalEnvios / paginationOptions.limit);
      if (Number(page) > lastPage) {
        res.status(400).json({ message: 'Página solicitada no existe' });
        return;
      }
      const currentPage = page ? 1 : Math.floor(paginationOptions.offset / paginationOptions.limit) + 1;
      const previusPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < lastPage ? currentPage + 1 : null;

      res.status(200).json({
        totalEnvios,
        lastPage,
        previusPage,
        nextPage,
        envios: enviosDto
      });
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

  cancelarEnvio = async (req: Request, res: Response) => {
    const { nroSeguimiento } = req.params;
    try {
      await this.enviosService.cancelarEnvio(Number(nroSeguimiento));
      res.status(200).json({ message: 'Envío cancelado' });
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}
