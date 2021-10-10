import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import createConnection from './database';
import { router } from './routes';

// createConnection()
//   .then(() => console.log('Conexão com DB efetuada com sucesso 1'))
//   .catch(err => console.log('Falha de conexão com o banco de dados', err));
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

export { app };
