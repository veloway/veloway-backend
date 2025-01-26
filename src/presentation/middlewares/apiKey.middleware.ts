import { type Request, type Response, type NextFunction } from 'express';

// Middleware para verificar que la API Key está presente en los headers
export const checkApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    res.status(401).json({ message: 'No API Key proporcionada.' });
  }

  // Guardamos la API Key en el objeto de la solicitud para que sea accesible por el controlador
  req.apikey = apiKey;

  next();
};
