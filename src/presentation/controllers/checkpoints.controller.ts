import { GetCheckpointDto } from '../../application/dtos/checkpoint/getCheckpoint.dto';
import { PostCheckpointDto } from '../../application/dtos/checkpoint/postCheckpoint.dto';
import { CheckpointService } from '../../application/services/checkpoint.service';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';
import { HandleError } from '../errors/handle.error';
import { type Request, type Response } from 'express';

@Injectable()
export class CheckpointsController {
  constructor(
    private readonly checkpointsService: CheckpointService
  ) {}

  create = async (req: Request, res: Response) => {
    const newCheckpoint = req.body;

    if (!newCheckpoint) {
      res.status(400).json({ message: 'Request body is empty' });
      return;
    }

    const [error, postCheckpointDto] = PostCheckpointDto.create(newCheckpoint);
    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    if (postCheckpointDto) {
      try {
        const idCheckpoint = await this.checkpointsService.create(postCheckpointDto);
        res.status(201).json({ idCheckpoint });
      } catch (error) {
        HandleError.throw(error, res);
      }
    }
  };

  getCheckpoint = async (req: Request, res: Response) => {
    const { idCheckpoint } = req.params;
    console.log(idCheckpoint);


    const parsedIdCheckpoint = Number(idCheckpoint);
    if (isNaN(parsedIdCheckpoint)) {
      res.status(400).json({ message: 'idCheckpoint debe ser un número válido' });
      return;
    }

    try {
      const checkpoint = await this.checkpointsService.getCheckpoint(parsedIdCheckpoint);
      if (!checkpoint) {
        res.status(404).json({ message: 'No se encontró el checkpoint' });
        return;
      }
      const checkpointDto = GetCheckpointDto.create(checkpoint);
      res.status(200).json(checkpointDto);
    } catch (error) {
      HandleError.throw(error, res);
    }
  };
}
