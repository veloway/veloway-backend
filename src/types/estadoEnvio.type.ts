export const enum EstadoEnvio {
  Confirmado = 'Confirmado',
  Cancelado = 'Cancelado',
  EnProcesoDeRetiro = 'En proceso de retiro',
  EnTrasladoADestino = 'En traslado a destino',
  Entregado = 'Entregado'
}

export const EstadoEnvioMap = {
  Confirmado: 1,
  Cancelado: 2,
  EnProcesoDeRetiro: 3,
  EnTrasladoADestino: 4,
  Entregado: 5
};
