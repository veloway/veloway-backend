import { PrismaClient } from '@prisma/client';
import { Injectable } from '../dependencies/injectable.dependency';
import { type IMarcaRepository } from '../../domain/repositories/marca.interface';
import { type Marca } from '../../domain/entities/marca.entity';

@Injectable()
export class MarcaRepository implements IMarcaRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async create(marca: Marca): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(marca: Marca): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getById(id: number): Promise<Marca | null> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<Marca[]> {
    throw new Error('Method not implemented.');
  }
}