import { type Licencia } from '../entities/licencia.entity'

export interface ILicencia {
    getAll: () => Promise <Licencia[]>
    getLicencia: (licenciaID: number) => Promise<Licencia | null> 
    create: (licencia: Licencia) => Promise<void>
    update: (id: string, licencia: Licencia) => Promise<void>
    delete: (id: string) => Promise<void>
}