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

app.listen(process.env.PORT || 4000, () =>
  // eslint-disable-next-line no-console
  console.log(`Server is running ${process.env.PORT || 4000}`),
);
