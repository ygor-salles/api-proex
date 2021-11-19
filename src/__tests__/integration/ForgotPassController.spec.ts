import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';
import { UserRepository } from '../../repositories/UserRepository';

// email cadastrado no seeder
const emailExists = 'user3@gmail.com';

// email inexistente
const emailInexists = 'userInexist@gmail.com';

describe('Auth', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('Should return 200 for resetting user password', async () => {
    const respository = getCustomRepository(UserRepository);
    const userFound = await respository.findOne({ email: emailExists });

    const response = await request(app).post('/forgot-password').send({ email: emailExists });

    const newUser = await respository.findOne({ email: emailExists });
    expect(userFound.password).not.toBe(newUser.password);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Senha atualizada com sucesso, verifique sua caixa de entrada',
    );
  });

  it('Should return 404 because email does not exists', async () => {
    const response = await request(app).post('/forgot-password').send({ email: emailInexists });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('E-mail de usuário inexistente no sistema!');
  });

  it('Should return 400 because the email was not informed', async () => {
    const response = await request(app).post('/forgot-password').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail é obrigatório');
  });
});
