import { PrismaClient } from "@prisma/client";
import { type IFichaMedicaRepository } from "../../domain/repositories/fichasMedicas.interface";
import { FichaMedicaMapper } from "../mappers/fichaMedica-prisma.mapper";
import { FichaMedica } from "../../domain/entities/fichaMedica.entity";
import { Injectable } from '../dependencies/injectable.dependency';

// @Injectable()
// export class FichaMedicaRepository implements IFichaMedicaRepository{
//     constructor (private readonly prisma: PrismaClient) {}

//     public async getAll(): Promise<FichaMedica[]>{
//         const fichasMedicasPrisma = await this.prisma.fichas_medicas.findMany();
//         return FichaMedicaMapper.fromPrismaArrayToEntity(fichasMedicasPrisma);
//     };

//     public async getFichaMedica(fichaMedicaID: number): Promise<FichaMedica | null>{
//         const fichaMedicaPrisma = await this.prisma.fichas_medicas.findUnique({
//             where: {
//                 id: fichaMedicaID
//             }
//         });

//         if(!fichaMedicaPrisma) return null;

//         return FichaMedicaMapper.fromPrismaToEntity(fichaMedicaPrisma);
//     }

//     public async getFichaMedicaByConductorId(conductorID: string): Promise<FichaMedica | null>{
//         const fichaMedicaPrisma = await this.prisma.fichas_medicas.findFirst({
//             where: {
//                 id_conductor: conductorID
//             }
//         });

//         if(!fichaMedicaPrisma) return null;

//         return FichaMedicaMapper.fromPrismaToEntity(fichaMedicaPrisma);
//     }

//     public async create(fichaMedica: FichaMedica): Promise<FichaMedica>{
//         const fichaMedicaPrisma = await this.prisma.fichas_medicas.create({
//             data: {
//                 altura: fichaMedica.getAltura(),
//                 peso: fichaMedica.getPeso(),
//                 enfermedad_cardiaca: fichaMedica.getEnfermedadCardiaca(),
//                 enfermedad_respiratoria: fichaMedica.getEnfermedadRespiratoria(),
//                 alergias: fichaMedica.getAlergias(),
//                 epilepsia: fichaMedica.getEpilepsia(),
//                 diabetes: fichaMedica.getDiabetes(),
//                 compartir: fichaMedica.getCompartir(),
//                 id_conductor: fichaMedica.getIdConductor()
//             }
//         });

//         return FichaMedicaMapper.fromPrismaToEntity(fichaMedicaPrisma);
//     }

//     public async update (id: number, fichaMedica: FichaMedica): Promise<FichaMedica>{
//         const fichaMedicaPrisma = await this.prisma.fichas_medicas.update({
//             where: {
//                 id: id
//             },
//             data: {
//                 altura: fichaMedica.getAltura(),
//                 peso: fichaMedica.getPeso(),
//                 enfermedad_cardiaca: fichaMedica.getEnfermedadCardiaca(),
//                 enfermedad_respiratoria: fichaMedica.getEnfermedadRespiratoria(),
//                 alergias: fichaMedica.getAlergias(),
//                 epilepsia: fichaMedica.getEpilepsia(),
//                 diabetes: fichaMedica.getDiabetes(),
//                 compartir: fichaMedica.getCompartir(),
//                 id_conductor: fichaMedica.getIdConductor()
//             }
//         });

//         return FichaMedicaMapper.fromPrismaToEntity(fichaMedicaPrisma);
//     }

//     public async delete(id: number){
//         await this.prisma.fichas_medicas.delete({
//             where: {
//                 id: id
//                 }
//             }
//         );
//     }
// }