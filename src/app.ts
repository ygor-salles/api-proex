import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import createConnection from './database';
import { router } from './routes';

createConnection();
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

export { app };
