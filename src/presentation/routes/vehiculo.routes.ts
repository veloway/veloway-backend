import { Router } from 'express';
import { VehiculosController } from '../controllers/vehiculo.controller';
import { Injectable } from '../../infrastructure/dependencies/injectable.dependency';

@Injectable()
export class VehiculoRoutes {
  private router = Router();

  constructor(private readonly vehiculosController: VehiculosController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/vehiculos', this.vehiculosController.getAll);
    this.router.get('/vehiculos/:vehiculoID', this.vehiculosController.getVehiculo);
    this.router.post('/vehiculos', this.vehiculosController.create);
    this.router.put('/vehiculos/:vehiculoID', this.vehiculosController.update);
    this.router.delete('/vehiculos/:vehiculoID', this.vehiculosController.delete);
  }

  public getRouter() {
    return this.router;
  }
}
