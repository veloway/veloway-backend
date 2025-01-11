import 'dotenv/config';

export const {
  PORT = 3000,
  DATABASE_URL,
  GEOCODING_API_KEY
} = process.env;