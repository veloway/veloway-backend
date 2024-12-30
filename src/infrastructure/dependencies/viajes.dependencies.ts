import { EnviosRepository } from "../repositories/envios.repository";

// crear servicio
const viajesService = new ViajesService(
    viajesRepository,
    conductoresRespository,
    EnviosRepository
    viajesMapper,
)