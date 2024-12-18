import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { enviosRouter } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors({
    origin: "*" //Temporal
}));

app.use('/api/envios', enviosRouter);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});