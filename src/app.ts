import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { ApiError } from './exceptions/ApiError';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err: ApiError | any, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    if (err.message) {
      return response.status(err.code).json({
        message: err.message,
      });
    }

    return response.status(err.code).end();
  }

  return response.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

export { app };
