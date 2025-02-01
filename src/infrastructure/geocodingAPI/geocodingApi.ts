import axios from 'axios';
import { type Envio } from '../../domain/entities/envio.entity';
import { GEOCODING_API_KEY } from '../../config/envs.config';

const API_KEY = GEOCODING_API_KEY;
const API_URL = 'https://api.opencagedata.com/geocode/v1/json';

interface CompleteAddress {
  calle: string
  numero: number
  localidad: string
  provincia: string
}

export const obtenerCoordenadas = async ({
  calle,
  numero,
  localidad,
  provincia
}: CompleteAddress): Promise<{ latitud: number, longitud: number } | null> => {
  // Rua Cafelândia, Carapicuíba, Brasil.
  // Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil
  const dirCompleta = `calle ${calle} ${numero}, ${localidad}, ${provincia}, Argentina`;
  const apiUrl1 = `${API_URL}?q=${dirCompleta}&key=${API_KEY}`;

  try {
    const response = await axios.get(apiUrl1);
    const results = response.data.results;

    if (results.length > 0) {
      const { lat, lng } = results[0].geometry;
      const latitud = lat;
      const longitud = lng;
      console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
      return { latitud, longitud };
    } else {
      console.log('No se encontraron coordenadas para la dirección.');
      return null;
    }
  } catch (error: any) {
    console.error('Error en pruebaCoordenadas:', error.response?.data || error.message);
    throw error;
  }
};

export async function obtenerCoordOrigen(envio: Envio): Promise<{ latitud: number, longitud: number } | null> {
  const calle = envio.getOrigen().getCalle();
  const numero = envio.getOrigen().getNumero();
  const localidad = envio.getOrigen().getLocalidad().getNombre();
  const provincia = envio.getOrigen().getLocalidad().getProvincia().getNombre();

  return await obtenerCoordenadas({ calle, numero, localidad, provincia });
};

export async function obtenerCoordDestino(envio: Envio): Promise<{ latitud: number, longitud: number } | null> {
  const calle = envio.getDestino().getCalle();
  const numero = envio.getDestino().getNumero();
  const localidad = envio.getDestino().getLocalidad().getNombre();
  const provincia = envio.getDestino().getLocalidad().getProvincia().getNombre();

  return await obtenerCoordenadas({ calle, numero, localidad, provincia });
};



// funcion inversa, obtiene las coordenadas a partir de las latitudes

