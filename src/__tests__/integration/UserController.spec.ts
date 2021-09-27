/* eslint-disable no-undef */
import httpStatus from 'http-status';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';

const createUser = {
  name: 'User example',
  email: 'user@example.com',
  password: '123456',
  role: 'NORMAL',
};

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    if (connection.isConnected) {
      console.log('Conexão com DB efetuada com sucesso 2');
    } else {
      console.log('Falha de connexão com o banco de dados');
    }
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send(createUser);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.name).toBe(createUser.name);
    expect(response.body.email).toBe(createUser.email);
    expect(response.body.role).toBe(createUser.role);
  });

  it('Should not be able to create a user with exists email', async () => {
    const response = await request(app).post('/users').send(createUser);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Usuário já existe');
  });
});
