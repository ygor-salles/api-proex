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

let token: string;
let userId: string;

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

  it('Should be able to login with existing user and a token must be returned', async () => {
    const loginUser = {
      email: createUser.email,
      password: createUser.password,
    };

    const response = await request(app).post('/login').send(loginUser);

    token = response.body.token;
    userId = response.body.id;

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty('token');
    expect(token.length).toBe(224);
  });

  it('Should not be able to login with a non-existing user', async () => {
    const loginNotExistingUser = {
      email: 'test@test.com',
      password: 'test',
    };

    const response = await request(app).post('/login').send(loginNotExistingUser);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Credenciais incorretas!');
  });

  it('Should not be able to login with a non-existing user', async () => {
    const loginNotExistingUser = {
      email: 'test@test.com',
      password: 'test',
    };

    const response = await request(app).post('/login').send(loginNotExistingUser);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Credenciais incorretas!');
  });

  it('Should be able to edit a existing user', async () => {
    const editedUser = {
      email: 'test@test.com',
      password: 'test',
    };

    const response = await request(app).put(`/users/${userId}`).send(editedUser);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe('Credenciais incorretas!');
  });
});
