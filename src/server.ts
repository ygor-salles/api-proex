import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import './database';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.API_PORT || 3030, () => 
    console.log(`Server is running ${process.env.API_PORT || 3030}`)
);