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
  role: 'SUPER',
};

let token: string;
let userId: string;

describe('Users', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Server is running', async () => {
    const response = await request(app).get('/');

    expect(response.body.message).toBe('Welcome api-proex');
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send(createUser);

    userId = response.body.id;

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

  it('Should be able to edit a existing user', async () => {
    const editedUser = {
      name: 'User example edited',
      email: 'user@example.com',
      password: '123456',
      role: 'SUPER',
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `bearer ${token}`)
      .send(editedUser);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Usuário atualizado com sucesso!');
  });

  it('Should be able to get a user by Id', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.name).toBe('User example edited');
  });

  it('Should not be able to get a user by Id', async () => {
    const response = await request(app).get(`/users/2`).set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.message).toBe('Usuário não existe!');
  });

  it('Should be able to get all users', async () => {
    const response = await request(app).get('/users').set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body[0].name).toBe('User example edited');
  });

  it('Should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Usuário removido com sucesso!');
  });
});
