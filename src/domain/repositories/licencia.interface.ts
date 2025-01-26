import { type Licencia } from '../entities/licencia.entity'

export interface ILicenciaRepository {
    getAll: () => Promise <Licencia[]>
    getLicencia: (licenciaID: number) => Promise<Licencia | null> 
    create: (licencia: Licencia) => Promise<Licencia>
    update: (id: number, licencia: Licencia) => Promise<void>
    delete: (id: number) => Promise<void>
}