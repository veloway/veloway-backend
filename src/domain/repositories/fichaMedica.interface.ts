import { type fichaMedica } from "../entities/fichaMedica.entity";

export interface IFichaMedicaRepository {
    getAll: () => Promise <fichaMedica[]>
    getFichaMedica: (fichaMedicaID: number) => Promise<fichaMedica | null> 
    getFichaMedicaByConductorId: (conductorID: string) => Promise<fichaMedica | null>
    create: (fichaMedica: fichaMedica) => Promise<fichaMedica>
    update: (id: number, fichaMedica: fichaMedica) => Promise<fichaMedica>
    delete: (id: number) => Promise<void>
}