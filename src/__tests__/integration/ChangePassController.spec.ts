import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';
// import { UserRepository } from '../../repositories/UserRepository';

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

  // Falta realizar o caso de sucesso

  // Casos de insucesso
  it('Should return 404 because email does not exists', async () => {
    const response = await request(app).post('/change-password').send({
      email: emailInexists,
      password: '1234567',
      codVerificacao: 'asdsWa4',
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuário não encontrado!');
  });

  it('Should return 400 because the email was not informed', async () => {
    const response = await request(app).post('/change-password').send({
      password: '1234567',
      codVerificacao: 'asdsWa4',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail é obrigatório');
  });

  it('Should return 400 because the password was not informed', async () => {
    const response = await request(app).post('/change-password').send({
      email: emailExists,
      codVerificacao: 'asdsWa4',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Senha é obrigatória');
  });

  it('Should return 400 because the codVerificacao was not informed', async () => {
    const response = await request(app).post('/change-password').send({
      email: emailExists,
      password: '1234567',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Código de verificação é obrigatório');
  });
});
