# Veloway API

## Description
Nuestra API brinda un servicio donde se podra realizar y consultar envios de paquetes a domicilio.

## Enpoints
### Para realizar un envio
- POST /api/envios/new
- Request Body:
```json
{
    "nombre": "Juan Perez",
    "direccion": "Calle 123",
    "telefono": "123456789",
    "peso": 10,
    "valor": 1000
}
```

### Para consultar un envio
- GET /api/envios/{nro_seguimiento}

