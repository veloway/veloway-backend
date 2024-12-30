
export class ViajeMapper {

}

/*
id_viaje SERIAL PRIMARY KEY,
checkpoint_actual INT NOT NULL DEFAULT 1,
fecha_inicio TIMESTAMP,
fecha_fin TIMESTAMP,
id_conductor UUID NOT NULL,
nro_seguimiento BIGINT UNIQUE NOT NULL,
origen_cord DOUBLE PRECISION,
destino_cord DOUBLE PRECISION,
FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor),
FOREIGN KEY (nro_seguimiento) REFERENCES envios(nro_seguimiento),
FOREIGN KEY (origen_cord) REFERENCES checkpoints(id_checkpoint),
FOREIGN KEY (destino_cord) REFERENCES checkpoints(id_checkpoint),
  */