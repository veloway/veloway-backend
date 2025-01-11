import axios from 'axios';
import { type Envio } from '../../domain/entities/envio.entity';

export async function obtenerCoordOrigen(envio: Envio): Promise<{ latitud: number, longitud: number } | null> {
  const apikey1 = '809cdca1c3dc45aaa76fd8d1d36ec7c1';
  const calle = envio.getOrigen().getCalle();
  const numero = envio.getOrigen().getNumero();
  const localidad = envio.getOrigen().getLocalidad().getNombre();
  const provincia = envio.getOrigen().getLocalidad().getProvincia().getNombre();
  // Rua Cafelândia, Carapicuíba, Brasil.
  // Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil
  const dirCompleta = `calle ${calle} ${numero}, ${localidad}, ${provincia}, Argentina`;
  const apiUrl1 = `https://api.opencagedata.com/geocode/v1/json?q=${dirCompleta}&key=${apikey1}`;

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

export async function obtenerCoordDestino(envio: Envio): Promise<{ latitud: number, longitud: number } | null> {
  const apikey1 = '809cdca1c3dc45aaa76fd8d1d36ec7c1';
  const calle = envio.getDestino().getCalle();
  const numero = envio.getDestino().getNumero();
  const localidad = envio.getDestino().getLocalidad().getNombre();
  const provincia = envio.getDestino().getLocalidad().getProvincia().getNombre();
  // Rua Cafelândia, Carapicuíba, Brasil.
  // Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil
  const dirCompleta = `calle ${calle} ${numero}, ${localidad}, ${provincia}, Argentina`;
  const apiUrl1 = `https://api.opencagedata.com/geocode/v1/json?q=${dirCompleta}&key=${apikey1}`;

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

// export async function pruebaCoordenadas(): Promise<void> {
//   const apikey = '809cdca1c3dc45aaa76fd8d1d36ec7c1';
//   const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+Brasil&key=${apikey}`;

//   try {
//     console.log('Realizando solicitud a OpenCage API');
//     const response = await axios.get(apiUrl);

//     const results = response.data.results;

//     if (results.length > 0) {
//       const { lat, lng } = results[0].geometry;
//       console.log(`Latitud: ${lat}, Longitud: ${lng}`);
//     }
//   } catch (error: any) {
//     console.error('Error en pruebaCoordenadas:', error.response?.data || error.message);
//     throw error;
//   }
// }


