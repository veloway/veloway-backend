-- Provincias
INSERT INTO provincias (nombre) 
VALUES 
	('Buenos Aires'), 
	('Córdoba'), 
	('Santa Fe');

-- Localidades
INSERT INTO localidades (codigo_postal, nombre, id_provincia)
VALUES 
    (1000, 'Ciudad Autónoma de Buenos Aires', 1),
    (5000, 'Córdoba Capital', 2),
    (2000, 'Rosario', 3);

-- Usuarios
INSERT INTO usuarios (id_usuario, dni, email, password, fecha_nac, nombre, apellido, es_conductor, telefono) 
VALUES 
    ('123e4567-e89b-12d3-a456-426614174000', 12345678, 'juan.perez@example.com', 'hashedpassword1', '1990-01-01', 'Juan', 'Pérez', FALSE, '111111111'),
    ('987f6543-e21c-54d3-b789-426614174001', 87654321, 'ana.gomez@example.com', 'hashedpassword2', '1985-05-15', 'Ana', 'Gómez', TRUE, '222222222'),
    ('456e7890-e21c-78d3-b456-426614174002', 34567890, 'maria.lopez@example.com', 'hashedpassword3', '1992-03-12', 'María', 'López', FALSE, '333333333'),
    ('789a1234-e21c-98d3-b123-426614174003', 65432198, 'carlos.martinez@example.com', 'hashedpassword4', '1988-07-08', 'Carlos', 'Martínez', TRUE, '444444444');

-- Domicilios
INSERT INTO domicilios (calle, numero, piso, depto, descripcion, id_localidad, id_usuario)
VALUES 
    ('Av. Rivadavia', 1234, NULL, NULL, 'Casa principal', 1, '123e4567-e89b-12d3-a456-426614174000'),
    ('San Martín', 5678, 3, 'B', 'Departamento', 2, '987f6543-e21c-54d3-b789-426614174001'),
    ('Córdoba', 91011, NULL, NULL, 'Casa secundaria', 3, '456e7890-e21c-78d3-b456-426614174002'),
    ('Santa Fe', 1213, 2, 'A', 'Oficina', 1, '789a1234-e21c-98d3-b123-426614174003'),
	('Mendoza', 1387, 3, 'A', 'Oficina', 1, NULL);

-- Marcas y Modelos de vehículos
INSERT INTO marcas (nombre) 
VALUES 
	('Toyota'),
	('Ford');

INSERT INTO modelos (nombre, id_marca)
VALUES 
    ('Hilux', 1), 
    ('Ranger', 2);

-- Tipos de vehículos
INSERT INTO tipos_vehiculos (nombre) 
VALUES 
	('Camioneta'), 
	('Auto');

-- Vehículos
INSERT INTO vehiculos (patente, anio, color, descripcion, nombre_seguro, id_modelo, id_tipo_vehiculo)
VALUES 
    ('ABC123', 2020, 'Blanco', 'Camioneta doble cabina', 'La Caja', 1, 1),
    ('XYZ789', 2019, 'Negro', 'Auto deportivo', 'Sancor', 2, 2);

-- Conductores
INSERT INTO conductores (id_conductor, dni, compartirFichaMedica, id_estado, id_vehiculo)
VALUES 
    ('987f6543-e21c-54d3-b789-426614174001', 87654321, TRUE, 1, 1),
    ('789a1234-e21c-98d3-b123-426614174003', 65432198, TRUE, 2, 2);

-- Fichas Médicas
INSERT INTO fichas_medicas (observaciones, telefono_emergencia, id_conductor)
VALUES 
    ('Sin alergias', '1122334455', '987f6543-e21c-54d3-b789-426614174001'),
    ('Hipertensión controlada', '5566778899', '789a1234-e21c-98d3-b123-426614174003');

-- Licencias
INSERT INTO licencias (numero, categoria, fechaVencimiento, id_conductor)
VALUES 
    (12345678, 'B1', '2025-12-31', '987f6543-e21c-54d3-b789-426614174001'),
    (87654321, 'C1', '2026-06-30', '789a1234-e21c-98d3-b123-426614174003');

-- Envíos
INSERT INTO envios (nro_seguimiento, descripcion, fecha, hora, peso_gramos, monto, id_cliente, id_estado, id_origen, id_destino)
VALUES 
    (10000001, 'Paquete pequeño', '2024-12-03', '10:30:00', 500.00, 3000, '123e4567-e89b-12d3-a456-426614174000', 1, 1, 5),
    (10000002, 'Electrodoméstico', '2024-12-03', '14:00:00', 2000.00, 4000, '456e7890-e21c-78d3-b456-426614174002', 2, 3, 4);

-- Viajes
INSERT INTO viajes (fecha_inicio, fecha_fin, id_conductor, nro_seguimiento)
VALUES 
    ('2024-12-03 09:00:00', NULL, '987f6543-e21c-54d3-b789-426614174001', 10000001),
    ('2024-12-03 13:30:00', NULL, '789a1234-e21c-98d3-b123-426614174003', 10000002);

-- Checkpoints
INSERT INTO checkpoints (latitud, longitud, numero, id_viaje) VALUES
(-34.6037, -58.3816, 1, 1),
(-34.6083, -58.3713, 2, 1),
(-34.6042, -58.3819, 3, 1),
(-34.6033, -58.3723, 4, 1),
(-34.6100, -58.3500, 1, 2),
(-34.6054, -58.3819, 2, 2),
(-34.6095, -58.3773, 3, 2),
(-34.6489, -58.4201, 4, 2);
