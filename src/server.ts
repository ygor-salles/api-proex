// import { app } from './app';

// app.listen(process.env.PORT || 4000, () =>
//   console.log(`Server is running ${process.env.PORT || 4000}`),
// );

import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import createConnection from './database';
import { router } from './routes';

createConnection()
  .then(async () => {
    console.log('Database connection successfully initialized');
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(router);
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server is running ${process.env.PORT || 4000}`),
    );
  })
  .catch(error => {
    console.log('TypeORM connection error: ', error.message);
  });
